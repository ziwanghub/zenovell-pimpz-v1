'use client';

import { useId, useRef, useState } from 'react';

type ExpectationTabId = 'timeline' | 'outcomes' | 'notes';

interface ProgressionItem {
  stage: string;
  time: string;
  description: string;
}

interface ExpectedOutcomeItem {
  outcome: string;
  timeframe: string;
  note?: string;
}

interface ProductExpectationAuthorityProps {
  timeline?: ProgressionItem[];
  expectedResults?: ExpectedOutcomeItem[];
  disclaimer?: string;
  safetyNotes?: string;
  consultationAdvice?: string;
}

const tabs: Array<{ id: ExpectationTabId; label: string }> = [
  { id: 'timeline', label: 'ผลลัพธ์ที่คาดหวัง' },
  { id: 'outcomes', label: 'ผลลัพธ์ที่ผู้ใช้มักคาดหวัง' },
  { id: 'notes', label: 'ข้อควรรู้' },
];

function ExpectationHeader({ id }: { id: string }) {
  return (
    <div className="mb-4">
      <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-white/45">
        Product Expectation
      </div>
      <h2 id={id} className="mt-1.5 text-[20px] font-semibold tracking-[-0.02em] text-white">
        ผลลัพธ์ที่คาดหวัง
      </h2>
      <p className="mt-1.5 text-[13px] leading-5.5 text-white/60">
        ทำความเข้าใจลำดับการเปลี่ยนแปลง ระยะเวลาที่คาดหวัง และข้อควรรู้ที่ควรอ่านก่อนตัดสินใจ
      </p>
    </div>
  );
}

function ProgressionStep({ item, index }: { item: ProgressionItem; index: number }) {
  return (
    <li className="relative flex gap-3 rounded-[16px] border border-white/8 bg-white/[0.025] px-3.5 py-3">
      <div className="flex w-[80px] shrink-0 flex-col">
        <span className="text-[12px] font-semibold text-[#ff77bd]">{item.time}</span>
        <span className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/34">
          Phase {index + 1}
        </span>
      </div>
      <div className="min-w-0">
        <h4 className="text-[14px] font-semibold leading-5 text-white">{item.stage}</h4>
        <p className="mt-1 text-[13px] leading-5.5 text-white/70">{item.description}</p>
      </div>
    </li>
  );
}

function OutcomeCard({ item }: { item: ExpectedOutcomeItem }) {
  return (
    <li className="rounded-[16px] border border-white/8 bg-white/[0.03] px-3.5 py-3">
      <h4 className="text-[14px] font-semibold leading-5 text-white">{item.outcome}</h4>
      <div className="mt-1 text-[12px] font-medium text-[#ffbfd9]">{item.timeframe}</div>
      {item.note ? (
        <p className="mt-1 text-[13px] leading-5.5 text-white/62">{item.note}</p>
      ) : null}
    </li>
  );
}

function NotesBlock({
  title,
  items,
  asAside = false,
}: {
  title: string;
  items: string[];
  asAside?: boolean;
}) {
  const content = (
    <>
      <h3 className="text-[13px] font-semibold text-white">{title}</h3>
      <ul className="mt-2 space-y-2">
        {items.map((item, index) => (
          <li
            key={`${title}-${index}`}
            className="rounded-[14px] border border-white/8 bg-white/[0.03] px-3 py-2.5 text-[13px] leading-5.5 text-white/68"
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );

  if (asAside) {
    return (
      <aside
        aria-label={title}
        className="rounded-[16px] border border-white/8 bg-white/[0.025] px-3.5 py-3.5"
      >
        {content}
      </aside>
    );
  }

  return (
    <section className="rounded-[16px] border border-white/8 bg-white/[0.025] px-3.5 py-3.5">
      {content}
    </section>
  );
}

export function ProductExpectationAuthority({
  timeline,
  expectedResults,
  disclaimer,
  safetyNotes,
  consultationAdvice,
}: ProductExpectationAuthorityProps) {
  const [selectedTab, setSelectedTab] = useState<ExpectationTabId>('timeline');
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const safeTimeline = timeline ?? [];
  const safeExpectedResults = expectedResults ?? [];

  const variabilityItems = Array.from(
    new Set(
      safeExpectedResults
        .map((item) => item.note?.trim())
        .filter((item): item is string => Boolean(item)),
    ),
  );
  const consistencyItems = Array.from(
    new Set(
      safeTimeline
        .map((item) => item.description.trim())
        .filter((item) => item.includes('สม่ำเสมอ') || item.includes('ต่อเนื่อง')),
    ),
  );
  const cautionItems = [safetyNotes?.trim(), consultationAdvice?.trim()].filter(
    (item): item is string => Boolean(item),
  );

  const hasTimeline = safeTimeline.length > 0;
  const hasExpectedResults = safeExpectedResults.length > 0;
  const hasNotesTabContent =
    Boolean(disclaimer) ||
    variabilityItems.length > 0 ||
    consistencyItems.length > 0 ||
    cautionItems.length > 0;

  if (!hasTimeline && !hasExpectedResults && !hasNotesTabContent) {
    return null;
  }

  const moveFocus = (nextIndex: number) => {
    const target = tabs[nextIndex];
    const tab = tabRefs.current[nextIndex];

    if (!target || !tab) {
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
    <section className="px-0 py-4 text-white" aria-labelledby={`${baseId}-heading`}>
      <ExpectationHeader id={`${baseId}-heading`} />

      <div className="rounded-[24px] border border-white/9 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-4 shadow-[0_16px_34px_rgba(0,0,0,0.2)]">
        <div
          className="scrollbar-none -mx-1 mb-3 flex gap-4 overflow-x-auto border-b border-white/10 px-1 pb-1"
          role="tablist"
          aria-label="ผลลัพธ์ที่คาดหวัง"
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
                  'relative flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap px-2 pb-3 pt-2 text-center text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2f96] focus-visible:ring-offset-2 focus-visible:ring-offset-[#120c18]',
                  isSelected ? 'text-[#ff4ba5]' : 'text-white/55 hover:text-white/78',
                ].join(' ')}
              >
                <span>{tab.label}</span>
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
          <div
            id={`${baseId}-timeline-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-timeline-tab`}
            hidden={selectedTab !== 'timeline'}
            className="rounded-[18px] bg-[#120d16] px-3.5 py-3.5"
          >
            {hasTimeline ? (
              <section aria-labelledby={`${baseId}-progression-heading`}>
                <h3
                  id={`${baseId}-progression-heading`}
                  className="mb-2.5 text-[13px] font-semibold text-white"
                >
                  ลำดับการเปลี่ยนแปลง
                </h3>
                <ol className="space-y-2.5">
                  {safeTimeline.slice(0, 3).map((item, index) => (
                    <ProgressionStep
                      key={`${item.time}-${item.stage}-${index}`}
                      item={item}
                      index={index}
                    />
                  ))}
                </ol>
              </section>
            ) : null}
          </div>

          <div
            id={`${baseId}-outcomes-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-outcomes-tab`}
            hidden={selectedTab !== 'outcomes'}
            className="rounded-[18px] bg-[#120d16] px-3.5 py-3.5"
          >
            {hasExpectedResults ? (
              <section aria-labelledby={`${baseId}-outcomes-heading`}>
                <h3
                  id={`${baseId}-outcomes-heading`}
                  className="mb-2.5 text-[13px] font-semibold text-white"
                >
                  ผลลัพธ์ที่ผู้ใช้มักคาดหวัง
                </h3>
                <ul className="space-y-2.5">
                  {safeExpectedResults.map((item, index) => (
                    <OutcomeCard key={`${item.outcome}-${index}`} item={item} />
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          <div
            id={`${baseId}-notes-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-notes-tab`}
            hidden={selectedTab !== 'notes'}
            className="space-y-2.5 rounded-[18px] bg-[#120d16] px-3.5 py-3.5"
          >
            {disclaimer ? (
              <NotesBlock title="ผลลัพธ์อาจแตกต่างกัน" items={[disclaimer]} asAside />
            ) : variabilityItems.length > 0 ? (
              <NotesBlock title="ผลลัพธ์อาจแตกต่างกัน" items={variabilityItems} asAside />
            ) : null}

            {consistencyItems.length > 0 ? (
              <NotesBlock title="ความสม่ำเสมอในการใช้" items={consistencyItems} />
            ) : null}

            {cautionItems.length > 0 ? (
              <NotesBlock title="ข้อควรระวังและคำแนะนำ" items={cautionItems} />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
