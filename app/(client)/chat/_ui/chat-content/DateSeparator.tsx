// components/chat/DateSeparator.tsx
import { formatDateDisplay } from "./utils";

interface DateSeparatorProps {
    date: Date;
}

const DateSeparator = ({ date }: DateSeparatorProps) => {
    return (
        <div className="!text-center !text-gray-500 !text-xs !my-4">
            {formatDateDisplay(date)}
        </div>
    );
};

export default DateSeparator;