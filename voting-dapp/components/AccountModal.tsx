import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useAccount, useDisconnect } from "@starknet-react/core";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountModal = ({ isOpen, onClose }: AccountModalProps) => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const copyAddress = () => {
    navigator.clipboard.writeText(address as string);
    toast("Address copied to clipboard");
  };
  const handleDisconnect = async () => {
    try {
      disconnect();
      toast("Wallet disconnected");
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border border-border">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Account
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-6 mt-6">
          {/* Avatar */}
          <div className="w-16 h-16 text-5xl flex items-center justify-center">
            ⚡
          </div>

          {/* Address */}
          <div className="w-full">
            <div className="text-sm text-muted-foreground text-center mb-2">
              Wallet Address
            </div>
            <div className="bg-muted p-3 rounded-lg font-mono text-sm text-center break-all">
              {address}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 w-full">
            <Button variant="default" className="flex-1" onClick={copyAddress}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Address
            </Button>

            <Button
              variant="destructive"
              className="flex-1"
              onClick={handleDisconnect}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Disconnect
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccountModal;
