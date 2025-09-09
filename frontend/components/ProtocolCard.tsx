// تعریف ساختار داده‌ای که این کامپوننت به عنوان ورودی (props) دریافت می‌کند
type Protocol = {
  id: number;
  name: string;
  category: string;
  tvl: number;
  logo?: string;
};

// تعریف پراپ‌های کامپوننت با استفاده از نوع بالا
interface ProtocolCardProps {
  protocol: Protocol;
}

// تابع کمکی برای فرمت کردن اعداد بزرگ (TVL)
const formatTvl = (tvl: number) => {
  if (tvl > 1_000_000_000) {
    return `$${(tvl / 1_000_000_000).toFixed(2)}b`; // میلیارد
  }
  if (tvl > 1_000_000) {
    return `$${(tvl / 1_000_000).toFixed(2)}m`; // میلیون
  }
  if (tvl > 1_000) {
    return `$${(tvl / 1_000).toFixed(2)}k`; // هزار
  }
  return `$${tvl.toFixed(2)}`;
};

export default function ProtocolCard({ protocol }: ProtocolCardProps) {
  // بررسی دفاعی: اگر به هر دلیلی داده پروتکل وجود نداشت، چیزی نمایش نده
  if (!protocol) {
    return null;
  }

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-4">
        {protocol.logo ? (
          <img src={protocol.logo} alt={`${protocol.name} logo`} className="w-10 h-10 rounded-full mr-4 bg-gray-200" />
        ) : (
          <div className="w-10 h-10 rounded-full mr-4 bg-gray-200"></div> // نمایش یک دایره خاکستری در نبود لوگو
        )}
        <h2 className="text-xl font-bold truncate">{protocol.name}</h2>
      </div>
      <div>
        <p className="text-gray-600">
          <span className="font-semibold">Category:</span> {protocol.category}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">TVL:</span> {formatTvl(protocol.tvl)}
        </p>
      </div>
    </div>
  );
}

