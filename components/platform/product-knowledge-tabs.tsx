'use client';

import { useId, useRef, useState } from 'react';
import { BadgeCheck, Check, CircleAlert, Leaf, ShieldCheck } from 'lucide-react';

type KnowledgeTabId = 'benefits' | 'ingredients' | 'usage' | 'important';

interface KnowledgeListItem {
  title: string;
  description?: string;
  meta?: string;
}

interface KnowledgePanel {
  items: KnowledgeListItem[];
}

interface ProductKnowledgeTabsProps {
  benefits: KnowledgePanel;
  ingredients: KnowledgePanel;
  usage: KnowledgePanel;
  importantInformation: KnowledgePanel;
}

const tabs: Array<{ id: KnowledgeTabId; label: string }> = [
  { id: 'benefits', label: 'ประโยชน์' },
  { id: 'ingredients', label: 'ส่วนประกอบ' },
  { id: 'usage', label: 'วิธีรับประทาน' },
  { id: 'important', label: 'ข้อมูลสำคัญ' },
];

const panelIcons = {
  benefits: Check,
  ingredients: Leaf,
  usage: BadgeCheck,
  important: ShieldCheck,
} satisfies Record<KnowledgeTabId, typeof Check>;

export function ProductKnowledgeTabs({
  benefits,
  ingredients,
  usage,
  importantInformation,
}: ProductKnowledgeTabsProps) {
  const [selectedTab, setSelectedTab] = useState<KnowledgeTabId>('benefits');
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const panels: Record<KnowledgeTabId, KnowledgePanel> = {
    benefits,
    ingredients,
    usage,
    important: importantInformation,
  };

  const moveFocus = (nextIndex: number) => {
    const tab = tabRefs.current[nextIndex];
    const target = tabs[nextIndex];

    if (!tab || !target) {
      return;
    }

    setSelectedTab(target.id);
    tab.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        moveFocus((index + 1) % tabs.length);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        moveFocus((index - 1 + tabs.length) % tabs.length);
        break;
      case 'Home':
        event.preventDefault();
        moveFocus(0);
        break;
      case 'End':
        event.preventDefault();
        moveFocus(tabs.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <section className="px-4 py-4 text-white min-[690px]:px-0" aria-labelledby={`${baseId}-heading`}>
      <div className="platform-shell-frame">
        <div className="rounded-[24px] border border-white/9 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] px-4 py-4 shadow-[0_16px_34px_rgba(0,0,0,0.2)]">
          <div className="mb-2.5">
            <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/45">
              Product Knowledge
            </div>
            <h2 id={`${baseId}-heading`} className="mt-1.5 text-[20px] font-semibold tracking-[-0.02em] text-white">
              ข้อมูลสินค้าเพื่อช่วยตัดสินใจได้ชัดขึ้น
            </h2>
          </div>

          <div
            className="scrollbar-none -mx-1 mb-3 flex gap-4 overflow-x-auto border-b border-white/10 px-1"
            role="tablist"
            aria-label="ข้อมูลสินค้า"
          >
            {tabs.map((tab, index) => {
              const isSelected = selectedTab === tab.id;

              return (
                <button
                  key={tab.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  id={`${baseId}-${tab.id}-tab`}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`${baseId}-${tab.id}-panel`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setSelectedTab(tab.id)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className={[
                    'relative min-h-11 shrink-0 whitespace-nowrap pb-3 pt-1 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2f96] focus-visible:ring-offset-2 focus-visible:ring-offset-[#120c18]',
                    isSelected ? 'text-[#ff4ba5]' : 'text-white/55 hover:text-white/78',
                  ].join(' ')}
                >
                  {tab.label}
                  <span
                    aria-hidden="true"
                    className={[
                      'absolute inset-x-0 bottom-0 h-[2px] rounded-full transition-opacity',
                      isSelected ? 'bg-[#ff2f96] opacity-100' : 'bg-transparent opacity-0',
                    ].join(' ')}
                  />
                </button>
              );
            })}
          </div>

          <div className="space-y-3">
            {tabs.map((tab) => {
              const isSelected = selectedTab === tab.id;
              const panel = panels[tab.id];
              const Icon = panelIcons[tab.id];

              return (
                <div
                  key={tab.id}
                  id={`${baseId}-${tab.id}-panel`}
                  role="tabpanel"
                  aria-labelledby={`${baseId}-${tab.id}-tab`}
                  hidden={!isSelected}
                  className="rounded-[18px] bg-[#120d16] px-3.5 py-3.5"
                >
                  {panel.items.length > 0 ? (
                    <ul className="space-y-2.5">
                      {panel.items.map((item, index) => (
                        <li
                          key={`${tab.id}-${index}-${item.title}`}
                          className="flex items-start gap-3 rounded-[16px] border border-white/6 bg-white/[0.02] px-3 py-2.5"
                        >
                          <span className="mt-0.5 inline-flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-full bg-[#ff2f96]/12 text-[#ff57ad]">
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          <div className="min-w-0">
                            <div className="text-[14px] font-semibold leading-5 text-white">
                              {item.title}
                            </div>
                            {item.meta ? (
                              <div className="mt-1 text-[12px] font-medium text-[#ffbfd9]">
                                {item.meta}
                              </div>
                            ) : null}
                            {item.description ? (
                              <p className="mt-1 text-[13px] leading-5.5 text-white/70">
                                {item.description}
                              </p>
                            ) : null}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex items-start gap-3 rounded-[16px] border border-white/8 bg-white/[0.02] px-3 py-3 text-[13px] leading-5.5 text-white/62">
                      <CircleAlert className="mt-1 h-4 w-4 shrink-0 text-white/50" />
                      ยังไม่มีข้อมูลที่พร้อมแสดงในหัวข้อนี้
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
