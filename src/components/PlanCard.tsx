import { Check, X } from 'lucide-react';

export interface PlanProps {
  tier: string;
  price: string;
  tagline: string;
  features: { text: string; included: boolean }[];
  isFeatured?: boolean;
  buttonText: string;
  onClick?: () => void;
}

export const PlanCard = ({ tier, price, tagline, features, isFeatured, buttonText, onClick }: PlanProps) => (
  <div className={`flex-1 rounded-[10px] p-[26px_22px] border relative transition-all cursor-pointer mt-4 lg:mt-0 ${isFeatured ? 'border-[#3b82f6]/50 bg-[#080f1c]' : 'border-white/6 bg-[#0c0c0c]'} hover:border-[#3b82f6]/30`} onClick={onClick}>
    {isFeatured  ?  (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#3b82f6] text-white text-[10px] font-bold tracking-[1px] uppercase px-3 py-0.5 rounded-full z-10 whitespace-nowrap">
        Most popular
      </div>
    ) : null}
    <div className={`text-[10px] font-600 tracking-[2px] uppercase mb-3 ${isFeatured ? 'text-[#3b82f6]/70' : 'text-white/25'}`}>
      {tier}
    </div>
    <div className="font-['Comic_Sans_MS'] text-[32px] font-800 text-white tracking-[-1px] leading-none mb-[3px]">
      <sup className="text-[15px] font-500 top-[-0.5em] tracking-normal">$</sup>{price}<span className="text-[12px] font-400 text-white/25 tracking-normal"> / month</span>
    </div>
    <p className="text-[11.5px] text-white/25 mb-5 font-light">{tagline}</p>
    <div className="h-[1px] bg-white/5 mb-[18px]" />
    <div className="space-y-[10px]">
      {features.map((f, i) => (
        <div key={i} className={`flex items-start gap-[9px] text-[12.5px] font-light leading-snug ${f.included ? 'text-white/55' : 'text-white/18'}`}>
          {f.included ? (
            <Check size={13} className="text-[#3b82f6] mt-0.5 shrink-0" />
          ) : (
            <X size={13} className="text-white/12 mt-0.5 shrink-0" />
          )}
          {f.text}
        </div>
      ))}
    </div>
    <button className={`w-full mt-[22px] py-[11px] rounded-[7px] text-[13px] font-500 font-['Comic_Sans_MS'] tracking-[0.2px] transition-all border-none cursor-pointer ${isFeatured ? 'bg-[#3b82f6] text-white hover:bg-[#2563eb]' : 'bg-white/5 text-white/50 border border-white/8 hover:bg-white/8'}`}>
      {buttonText}
    </button>
  </div>
);
