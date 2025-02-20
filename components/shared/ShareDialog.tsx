// components/ShareDialog.tsx
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Adjust the import based on your UI library structure
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareDialog({ isOpen, onClose }: ShareDialogProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset success message after 2 seconds
    });
  };

  const shareOnSocialMedia = (platform: string) => {
    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          currentUrl
        )}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          currentUrl
        )}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          currentUrl
        )}`;
        break;
      default:
        break;
    }
    window.open(shareUrl, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share This Page</DialogTitle>
          <DialogDescription>
            Share the URL or copy it to your clipboard.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input value={currentUrl} readOnly />
          <Button variant="uraOrange" onClick={copyToClipboard}>
            {copySuccess ? "Copied!" : "Copy URL"}
          </Button>
          <div className="flex gap-2">
            <Button
              variant="uraOrange"
              onClick={() => shareOnSocialMedia("twitter")}
            >
              Share on Twitter
            </Button>
            <Button
              variant="uraOrange"
              onClick={() => shareOnSocialMedia("facebook")}
            >
              Share on Facebook
            </Button>
            <Button
              variant="uraOrange"
              onClick={() => shareOnSocialMedia("linkedin")}
            >
              Share on LinkedIn
            </Button>
          </div>
        </div>
        <Button variant="destructive" onClick={onClose}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
