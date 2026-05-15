import  { useState, useEffect } from 'react';
import { PenTool, DollarSign, Calendar, BarChart3, Eye, ArrowRight, Star, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const perks = [
  {
    icon: DollarSign,
    title: 'Transparent revenue share',
    desc: 'Earn based on read-time. See exactly how your payout is calculated every month — no black-box algorithms.',
  },
  {
    icon: Calendar,
    title: 'Chapter scheduling',
    desc: 'Queue chapters in advance and auto-publish on your schedule. Keep readers coming back without the grind.',
  },
  {
    icon: BarChart3,
    title: 'Deep analytics',
    desc: 'Track drop-off rates, demographics, peak reading hours, and follower growth per chapter.',
  },
  {
    icon: Eye,
    title: 'Draft & preview mode',
    desc: 'Upload drafts for review before going live. Share preview links with your inner circle before publication.',
  },
];

const stats = [
  { value: '840+', label: 'Active creators' },
  { value: '1.2M', label: 'Monthly readers' },
  { value: '$420k', label: 'Paid out to date' },
  { value: '3,800+', label: 'Chapters published' },
];

const steps = [
  { num: '01', title: 'Apply to publish', desc: 'Submit a short application with your comic concept and sample pages. We review within 5 business days.' },
  { num: '02', title: 'Upload your work', desc: 'Use the creator dashboard to upload chapters, set cover art, write descriptions, and tag genres.' },
  { num: '03', title: 'Grow your audience', desc: 'Get discovered via genre pages, trending charts, and new release feeds. Readers follow and get notified.' },
  { num: '04', title: 'Get paid monthly', desc: 'Revenue is calculated from verified read-time each month. Payouts hit your account on the 1st.' },
];

const creators = [
  {
    avatar: 'KA',
    name: 'Kemi Adeyemi',
    location: 'Abuja, Nigeria',
    bio: 'Action and dark fantasy specialist. Creator of Iron Ghost and Last Queen — known for brutal pacing and stunning fight choreography.',
    works: ['#14080a', '#14080e', '#100808'],
    stats: [
      { val: '88k', label: 'Readers' },
      { val: '3', label: 'Series' },
      { val: '4.8', label: 'Rating' },
    ],
    avatarColor: 'bg-blue-500/12 text-blue-500',
  },
  {
    avatar: 'LS',
    name: 'Lin Soo',
    location: 'Seoul, South Korea',
    bio: 'Fantasy world-builder behind Jade Empire. Meticulous lore, hand-painted panel style, and a fanbase that lives for lore drops.',
    works: ['#090e0b', '#0a140c'],
    stats: [
      { val: '64k', label: 'Readers' },
      { val: '2', label: 'Series' },
      { val: '4.9', label: 'Rating' },
    ],
    avatarColor: 'bg-green-500/12 text-green-500',
  },
  {
    avatar: 'CO',
    name: 'Chidi Osu',
    location: 'Port Harcourt, Nigeria',
    bio: 'Sci-Fi visionary and creator of Void Runner. Cinematic composition with a love for hard science and existential dread.',
    works: ['#090c14', '#0a0c10'],
    stats: [
      { val: '51k', label: 'Readers' },
      { val: '2', label: 'Series' },
      { val: '4.7', label: 'Rating' },
    ],
    avatarColor: 'bg-amber-500/12 text-amber-500',
  },
  {
    avatar: 'AN',
    name: 'Amara Nwosu',
    location: 'Enugu, Nigeria',
    bio: 'Western and historical fiction. Red Dust broke records for fastest-growing new series on InkVerse. Gritty, gorgeous, relentless.',
    works: ['#130f08', '#14110a'],
    stats: [
      { val: '39k', label: 'Readers' },
      { val: '2', label: 'Series' },
      { val: '4.6', label: 'Rating' },
    ],
    avatarColor: 'bg-orange-400/12 text-orange-400',
  },
  {
    avatar: 'SK',
    name: 'Sara Kim',
    location: 'Toronto, Canada',
    bio: 'Horror and psychological thriller artist. Deep Blue has been called the scariest comic on the platform. Fully deserved.',
    works: ['#0a0814', '#0c0814'],
    stats: [
      { val: '47k', label: 'Readers' },
      { val: '2', label: 'Series' },
      { val: '4.8', label: 'Rating' },
    ],
    avatarColor: 'bg-purple-400/12 text-purple-400',
  },
  {
    avatar: 'OD',
    name: 'Obiageli Dike',
    location: 'Lagos, Nigeria',
    bio: 'Romance and slice-of-life storyteller. Silver Tide became a reader favourite in its first week. Warm, funny, deeply human.',
    works: ['#0c1410', '#0e140e'],
    stats: [
      { val: '33k', label: 'Readers' },
      { val: '2', label: 'Series' },
      { val: '4.9', label: 'Rating' },
    ],
    avatarColor: 'bg-pink-500/12 text-pink-500',
  },
];

export const Creators = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const nextFeatured = () => {
    setFeaturedIndex((prev) => (prev === creators.length - 1 ? 0 : prev + 1));
  };

  const prevFeatured = () => {
    setFeaturedIndex((prev) => (prev === 0 ? creators.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextFeatured();
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const featured = creators[featuredIndex];

  return (
    <div className="min-h-screen bg-[#080808] font-['Comic_Sans_MS']">
      {/* Hero Section */}
      <div className="relative border-b border-white/5 px-6 md:px-[52px] py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/6 via-transparent to-transparent" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="flex items-center gap-2 mb-4.5">
              <div className="w-4 h-px bg-blue-500" />
              <span className="text-xs font-medium letter-spacing-wide uppercase text-blue-500">For creators</span>
            </div>

            <h1 className="text-5xl font-black text-white font-['Comic_Sans_MS'] tracking-tight leading-tight mb-4 space-y-1">
              Your story.<br /><span className="text-blue-500">Your revenue.</span>
            </h1>

            <p className="text-sm text-white/40 leading-relaxed max-w-96 mb-8 font-light">
              InkVerse is built for indie comic creators. Upload your work, grow your audience, and earn a transparent share of subscription revenue — with no gatekeepers.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium font-['Comic_Sans_MS'] transition-colors flex items-center justify-center gap-2">
                <PenTool size={14} />
                Apply to publish
              </button>
              <button className="bg-white/5 hover:bg-white/8 border border-white/8 text-white/60 px-5 py-3 rounded-lg text-sm font-medium font-['Comic_Sans_MS'] transition-colors text-center">
                Learn more
              </button>
            </div>
          </div>

          {/* Right Perks */}
          <div className="flex flex-col gap-3">
            {perks.map((perk) => {
              const Icon = perk.icon;
              return (
                <div key={perk.title} className="bg-[#0d0d0d] border border-white/6 rounded-lg p-4.5 hover:border-blue-500/20 transition-colors flex gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/15 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white font-['Comic_Sans_MS'] mb-0.5">{perk.title}</h3>
                    <p className="text-xs text-white/35 leading-relaxed font-light">{perk.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="border-y border-white/5 grid grid-cols-2 md:grid-cols-4 md:divide-x divide-white/5 py-4 md:py-0">
        {stats.map((stat) => (
          <div key={stat.label} className="px-6 md:px-[52px] py-2 md:py-6 text-center md:text-left">
            <div className="text-3xl font-black text-white font-['Comic_Sans_MS'] tracking-tight mb-1">
              {stat.value}
            </div>
            <div className="text-xs text-white/25 letter-spacing-wide uppercase">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div className="border-b border-white/5 px-6 md:px-[52px] py-10 md:py-14">
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-3.5 h-px bg-blue-500" />
          <span className="text-xs font-bold letter-spacing-wider uppercase text-white">How it works</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/4 rounded-lg overflow-hidden border border-white/4">
          {steps.map((step, idx) => (
            <div key={step.num} className="bg-[#080808] p-6 lg:p-7 relative">
              <div className="text-5xl font-black text-blue-500/15 font-['Comic_Sans_MS'] letter-spacing-tight mb-3 leading-none">
                {step.num}
              </div>
              <h3 className="text-sm font-bold text-white font-['Comic_Sans_MS'] mb-2">{step.title}</h3>
              <p className="text-xs text-white/35 leading-relaxed font-light">{step.desc}</p>

              {idx < 3 && (
                <div className="hidden lg:flex absolute top-7 -right-1 w-6 h-6 items-center justify-center bg-[#080808] z-10">
                  <ArrowRight size={13} className="text-white/15" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Featured Creator Carousel */}
      <div className="border-b border-white/5 px-6 md:px-[52px] py-10 md:py-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-3.5 h-px bg-blue-500" />
            <span className="text-xs font-bold letter-spacing-wider uppercase text-white">Featured creator</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={prevFeatured}
              className="p-2 hover:bg-white/5 rounded-lg border border-white/8 text-white/40 hover:text-white/60 transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextFeatured}
              className="p-2 hover:bg-white/5 rounded-lg border border-white/8 text-white/40 hover:text-white/60 transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-0 bg-[#0c0c0c] border border-white/6 rounded-2xl overflow-hidden">
          {/* Left */}
          <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-white/4 flex flex-col justify-between gap-6 lg:gap-0">
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center font-['Comic_Sans_MS'] font-black text-lg border border-current/20 ${featured.avatarColor}`}>
                  {featured.avatar}
                </div>
                <div>
                  <h3 className="text-lg font-black text-white font-['Comic_Sans_MS']">{featured.name}</h3>
                  <p className="text-xs text-white/28">@{featured.name.toLowerCase().replace(' ', '')} · {featured.location}</p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold letter-spacing-wide uppercase px-2 py-0.75 rounded mb-3.5">
                <Star size={9} />
                Featured creator
              </div>

              <p className="text-sm text-white/40 leading-relaxed font-light mb-5">
                {featured.bio}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {['Featured', 'Creator', 'Popular'].map((tag) => (
                  <div key={tag} className="text-xs text-white/35 border border-white/8 px-2.5 py-1 rounded-full">
                    {tag}
                  </div>
                ))}
              </div>

              <div className="flex gap-5 py-4 border-y border-white/5 mb-5">
                {featured.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-xl font-black text-white font-['Comic_Sans_MS']">{stat.val}</div>
                    <div className="text-xs text-white/25 letter-spacing-wide uppercase mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium font-['Comic_Sans_MS'] transition-colors">
              Follow creator
            </button>
          </div>

          {/* Right */}
          <div className="p-6 flex flex-col gap-4">
            <div>
              <div className="text-xs text-white/25 letter-spacing-wide uppercase mb-1 font-medium">Works</div>
              <div className="grid grid-cols-4 gap-2.5">
                {[
                  featured.works[0] || '#100810',
                  featured.works[1] || '#08100c',
                  featured.works[2] || '#080c14',
                  featured.works[3] || '#14100a',
                ].map((bgColor, idx) => (
                  <div
                    key={idx}
                    className="relative rounded-lg overflow-hidden aspect-[2/3] cursor-pointer hover:scale-105 transition-transform group"
                    style={{ backgroundColor: bgColor }}
                  >
                    <div className="absolute inset-0 font-['Comic_Sans_MS'] text-base font-black text-white/5 flex items-center justify-center text-center px-1">
                      WORK
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 z-10">
                      <div className="text-xs font-bold text-white font-['Comic_Sans_MS'] leading-tight mb-0.5">Series</div>
                      <div className="text-[9px] text-white/35">Active</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-5">
              <div className="text-xs text-white/25 letter-spacing-wide uppercase mb-3.5 font-medium">Creator stats</div>
              <div className="flex gap-4 md:gap-6">
                <div>
                  <div className="text-2xl font-black text-blue-500 font-['Comic_Sans_MS']">{featured.stats[0].val}</div>
                  <div className="text-xs text-white/25 letter-spacing-wide uppercase mt-1">{featured.stats[0].label}</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-white font-['Comic_Sans_MS']">{featured.stats[1].val}</div>
                  <div className="text-xs text-white/25 letter-spacing-wide uppercase mt-1">{featured.stats[1].label}</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-white font-['Comic_Sans_MS']">{featured.stats[2].val}</div>
                  <div className="text-xs text-white/25 letter-spacing-wide uppercase mt-1">{featured.stats[2].label}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Model */}
      <div className="border-b border-white/5 bg-[#060606] px-6 md:px-[52px] py-10 md:py-12">
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-3.5 h-px bg-blue-500" />
          <span className="text-xs font-bold letter-spacing-wider uppercase text-white">How revenue works</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black text-white font-['Comic_Sans_MS'] mb-2.5">Transparent by design.</h2>
            <p className="text-sm text-white/38 leading-relaxed font-light mb-6">
              Every month, we take total subscription revenue and distribute it to creators proportionally based on verified reader read-time. The more your readers engage, the more you earn. No hidden deductions, no opaque multipliers.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/40 w-20">Creators</span>
                <div className="flex-1 bg-white/5 rounded h-1.5 overflow-hidden">
                  <div className="bg-blue-500 h-full" style={{ width: '70%' }} />
                </div>
                <span className="text-xs font-black text-white font-['Comic_Sans_MS'] w-12 text-right">70%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/40 w-20">Platform</span>
                <div className="flex-1 bg-white/5 rounded h-1.5 overflow-hidden">
                  <div className="bg-white/15 h-full" style={{ width: '20%' }} />
                </div>
                <span className="text-xs text-white/35 w-12 text-right">20%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/40 w-20">Processing</span>
                <div className="flex-1 bg-white/5 rounded h-1.5 overflow-hidden">
                  <div className="bg-white/8 h-full" style={{ width: '10%' }} />
                </div>
                <span className="text-xs text-white/25 w-12 text-right">10%</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Avg. monthly payout', value: '$1,840', sub: 'Per creator with 50k+ monthly reads' },
              { label: 'Top creator earnings', value: '$8,200', sub: 'Highest monthly payout on the platform' },
              { label: 'Payout schedule', value: '1st of month', sub: 'Direct to your account, every month' },
            ].map((item) => (
              <div key={item.label} className="bg-[#0c0c0c] border border-white/6 rounded-lg p-4.5">
                <div className="text-xs text-white/25 letter-spacing-wide uppercase mb-2 font-medium">{item.label}</div>
                <div className="text-2xl font-black text-green-500 font-['Comic_Sans_MS'] mb-1">{item.value}</div>
                <div className="text-xs text-white/25 font-light">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Creator Grid */}
      <div className="px-6 md:px-[52px] py-10 md:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-3.5 h-px bg-blue-500" />
            <span className="text-xs font-bold letter-spacing-wider uppercase text-white">Meet the creators</span>
          </div>
          <div className="flex items-center bg-[#0d0d0d] border border-white/7 rounded-lg overflow-hidden w-full sm:w-56">
            <Search size={14} className="text-white/22 ml-2.5" />
            <input
              type="text"
              placeholder="Search creators…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs text-white placeholder:text-white/18 px-2.5 py-2 w-full font-['Comic_Sans_MS']"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {creators.map((creator) => (
            <div key={creator.name} className="bg-[#0c0c0c] border border-white/6 rounded-xl p-5.5 hover:border-blue-500/20 transition-colors cursor-pointer flex flex-col">
              <div className="flex items-center gap-3 mb-3.5">
              <div className={`w-11 h-11 rounded-full ${creator.avatarColor} flex items-center justify-center font-['Comic_Sans_MS'] font-black text-sm border border-current/20`}>
                  {creator.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white font-['Comic_Sans_MS'] truncate">{creator.name}</h4>
                  <p className="text-xs text-white/22">{creator.location}</p>
                </div>
                <button className="bg-blue-500/10 border border-blue-500/18 text-blue-500 px-3 py-1 rounded text-xs font-medium font-['Comic_Sans_MS'] hover:bg-blue-500/18 transition-colors whitespace-nowrap flex-shrink-0">
                  Follow
                </button>
              </div>

              <p className="text-xs text-white/33 leading-relaxed font-light mb-3.5">{creator.bio}</p>

              <div className="flex gap-1 mb-3.5">
                {creator.works.map((color, idx) => (
                  <div key={idx} className="flex-1 aspect-[2/3] rounded" style={{ backgroundColor: color }} />
                ))}
              </div>

              <div className="flex border-t border-white/5 pt-3.5">
                {creator.stats.map((stat) => (
                  <div key={stat.label} className="flex-1 text-center border-r border-white/5 last:border-r-0">
                    <div className="text-sm font-black text-white font-['Comic_Sans_MS']">{stat.val}</div>
                    <div className="text-xs text-white/22 letter-spacing-wide uppercase mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Join Banner */}
      <div className="relative mx-6 md:mx-[52px] mb-12 bg-[#080f1c] border border-blue-500/12 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-gradient-to-b from-blue-500/8 to-transparent" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3.5 h-px bg-blue-500" />
            <span className="text-xs font-medium letter-spacing-wide uppercase text-blue-500">Ready to publish?</span>
          </div>
          <h2 className="text-2xl font-black text-white font-['Comic_Sans_MS'] tracking-tight mb-2 text-balance">Your first chapter is waiting.</h2>
          <p className="text-sm text-white/35 font-light leading-relaxed max-w-md">
            Join 840+ creators already building their audience on InkVerse. Free to join, fair revenue share, and a platform that actually cares about your craft.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-shrink-0 relative z-10 w-full md:w-auto">
          <button className="bg-white/5 border border-white/8 text-white/50 hover:bg-white/8 px-6 py-3 rounded-lg text-sm font-medium font-['Comic_Sans_MS'] transition-colors text-center w-full sm:w-auto">
            Read the FAQ
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium font-['Comic_Sans_MS'] transition-colors text-center w-full sm:w-auto">
            Apply to publish
          </button>
        </div>
      </div>
    </div>
  );
};
