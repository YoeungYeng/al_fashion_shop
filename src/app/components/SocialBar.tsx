import { Send, MessageCircleMore } from "lucide-react";

interface SocialBarProps {
  onTelegram: () => void;
  onMessenger: () => void;
}

export function SocialBar({
  onTelegram,
  onMessenger,
}: SocialBarProps) {
  return (
    <div className="w-full border-t border-gray-100 pt-3">
      <div
        className="
          flex flex-col
          sm:flex-row
          gap-2
          w-full
        "
      >
        {/* Telegram */}
        <button
          onClick={onTelegram}
          className="
            flex items-center justify-center gap-2
            flex-1
            w-full
            h-10
            px-3 md:px-4 lg:px-5
            py-2 md:py-3
            bg-[#229ED9]
            text-white
            font-medium
            text-[12px] sm:text-[12px] md:text-[12px]
            hover:opacity-90
            active:scale-95
            transition-all
            rounded
            hover:cursor-pointer
          "
        >
          <Send className="w-4 h-4 md:w-4 md:h-4" />
          <span >Telegram</span>
        </button>

        {/* Messenger */}
        <button
          onClick={onMessenger}
          className="
            flex items-center justify-center gap-2
            flex-1
            w-full
            rounded
            h-10
            px-3 md:px-4 lg:px-5
            py-2 md:py-3
            bg-[#1877F2]
            text-white
            font-medium
            text-[12px] sm:text-[12px] md:text-[12px]
            hover:opacity-90
            active:scale-95
            transition-all
            hover:cursor-pointer
          "
        >
          <MessageCircleMore className="w-4 h-4 md:w-4 md:h-4" />
          <span >Messenger</span>
        </button>
      </div>
    </div>
  );
}