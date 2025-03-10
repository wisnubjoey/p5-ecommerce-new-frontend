// src/components/checkout/WhatsAppCheckoutDialog.tsx
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Phone, Copy, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

interface WhatsAppCheckoutDialogProps {
  message: string;
  phoneNumber: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WhatsAppCheckoutDialog({
  message,
  phoneNumber,
  open,
  onOpenChange
}: WhatsAppCheckoutDialogProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message);
    setIsCopied(true);
    toast.success('Pesan berhasil disalin');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const getWhatsAppLinks = () => {
    const encodedMessage = encodeURIComponent(message);
    return {
      web: `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`,
      mobile: `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Checkout via WhatsApp</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Pilih cara untuk menghubungi kami:</p>
          </div>

          <div className="grid gap-4">
            {/* WhatsApp Web Button */}
            <Button 
              onClick={() => window.open(getWhatsAppLinks().web, '_blank')}
              className="w-full"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Buka di WhatsApp Web
            </Button>

            {/* WhatsApp Mobile/Desktop App Button */}
            <Button 
              onClick={() => window.open(getWhatsAppLinks().mobile, '_blank')}
              className="w-full"
            >
              <Phone className="mr-2 h-4 w-4" />
              Buka di Aplikasi WhatsApp
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Atau
                </span>
              </div>
            </div>

            {/* Copy Message Button */}
            <Button
              variant="outline"
              onClick={handleCopyMessage}
              className="w-full"
            >
              <Copy className="mr-2 h-4 w-4" />
              {isCopied ? 'Tersalin!' : 'Salin Pesan'}
            </Button>
          </div>

          <div className="text-sm text-gray-500">
            <p>Nomor WhatsApp: {phoneNumber}</p>
            <p className="mt-1">Tips: Jika link tidak berfungsi, salin pesan dan kirim manual ke nomor WhatsApp kami.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}