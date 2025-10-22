
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Camera, RefreshCw } from "lucide-react";

type CameraDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onPhotoSelect: (dataUri: string) => void;
};

export function CameraDialog({ isOpen, onOpenChange, onPhotoSelect }: CameraDialogProps) {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setCapturedImage(null); // Reset on open
      const getCameraPermission = async () => {
        try {
          // Check for mediaDevices support
          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error("Camera API not supported in this browser.");
          }
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error("Error accessing camera:", error);
          setHasCameraPermission(false);
          toast({
            variant: "destructive",
            title: "Camera Access Denied",
            description: "Please enable camera permissions in your browser settings.",
          });
        }
      };
      getCameraPermission();
    } else {
      // Cleanup: stop video stream when dialog is closed
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [isOpen, toast]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUri = canvas.toDataURL("image/png");
        setCapturedImage(dataUri);
      }
    }
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onPhotoSelect(capturedImage);
    }
  };
  
  const handleRetake = () => {
    setCapturedImage(null);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Take a Picture</DialogTitle>
          <DialogDescription>
            Center your face in the frame and capture your photo.
          </DialogDescription>
        </DialogHeader>
        <div className="relative">
          {capturedImage ? (
            <img src={capturedImage} alt="Captured" className="w-full aspect-video rounded-md" />
          ) : (
             <video ref={videoRef} className="w-full aspect-video rounded-md bg-muted" autoPlay muted />
          )}
          <canvas ref={canvasRef} className="hidden" />

          {hasCameraPermission === false && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
                <Alert variant="destructive" className="w-4/5">
                    <AlertTitle>Camera Access Required</AlertTitle>
                    <AlertDescription>
                        Please allow camera access in your browser to use this feature.
                    </AlertDescription>
                </Alert>
            </div>
          )}
        </div>
        <DialogFooter>
          {capturedImage ? (
            <>
              <Button variant="outline" onClick={handleRetake}>
                <RefreshCw className="mr-2"/>
                Retake
              </Button>
              <Button onClick={handleConfirm}>Confirm Photo</Button>
            </>
          ) : (
            <Button onClick={handleCapture} disabled={!hasCameraPermission}>
              <Camera className="mr-2"/>
              Capture
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
