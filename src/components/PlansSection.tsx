"use client"

import { useState } from 'react';
import { PlanCard } from './PlanCard';

export const PlansSection = () => {
  const [_selectedPlan, setSelectedPlan] = useState<string>('Premium');

  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-[52px] py-8 sm:py-10 lg:py-[52px] lg:pb-[56px] bg-[#060606] border-t border-white/4">
      <div className="flex flex-col items-center text-center mb-6 sm:mb-9">
        <div className="flex items-center gap-2 sm:gap-2.5 mb-2 sm:mb-3">
          <div className="w-3 sm:w-4 h-[1px] bg-[#3b82f6]" />
          <span className="text-[8px] sm:text-[10px] lg:text-[10.5px] font-500 tracking-[1.5px] sm:tracking-[2px] lg:tracking-[2.5px] uppercase text-[#3b82f6]">Membership</span>
          <div className="w-3 sm:w-4 h-[1px] bg-[#3b82f6]" />
        </div>
        <h2 className="font-['Comic_Sans_MS'] text-xl sm:text-2xl md:text-[28px] lg:text-[30px] font-800 text-white tracking-[-0.5px] sm:tracking-[-0.6px] lg:tracking-[-0.8px] mb-1 sm:mb-2">Built for collectors.</h2>
        <p className="text-xs sm:text-sm md:text-base lg:text-[13px] text-white/30 font-light leading-relaxed max-w-sm sm:max-w-md">
          Unlimited reading. Support the creators you love. Cancel anytime.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-[14px]">
        <PlanCard 
          tier="Standard" price="4" tagline="For the casual reader." 
          features={[
            { text: "Full library access", included: true },
            { text: "Chapter comments", included: true },
            { text: "Follow creators", included: true },
            { text: "Early access", included: false },
            { text: "Offline downloads", included: false }
          ]}
          buttonText="Get started"
          isFeatured={false}
          onClick={() => setSelectedPlan('Standard')}
        />
        <PlanCard 
          tier="Premium" price="8" tagline="For the dedicated collector." 
          features={[
            { text: "Everything in Standard", included: true },
            { text: "Early chapter access", included: true },
            { text: "Offline downloads", included: true },
            { text: "Tip creators directly", included: true },
            { text: "Reading stats & history", included: true }
          ]}
          buttonText="Start 7-day free trial"
          isFeatured={true}
          onClick={() => setSelectedPlan('Premium')}
        />
        <PlanCard 
          tier="Creator" price="0" tagline="For indie comic creators." 
          features={[
            { text: "Upload & publish", included: true },
            { text: "Revenue share", included: true },
            { text: "Chapter scheduling", included: true },
            { text: "Analytics dashboard", included: true },
            { text: "Draft & preview mode", included: true }
          ]}
          buttonText="Start creating"
          isFeatured={false}
          onClick={() => setSelectedPlan('Creator')}
        />
      </div>
    </section>
  );
};
