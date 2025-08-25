import { styles } from '@/app/styles/style';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';

type Props = {};

const FAQ = (props: Props) => {
  const { data } = useGetHeroDataQuery('FAQ');
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data?.layout?.faq) {
      setQuestions(data.layout.faq);
    }
  }, [data]);

  const toggleQuestion = (id: string) => {
    setActiveQuestion((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-[90%] 800px:w-[80%] mx-auto my-16">
      <h1 className={`${styles.title} 800px:text-[40px] text-center`}>
        Frequently Asked Questions
      </h1>

      <dl className="mt-12 space-y-6 border border-gray-300 dark:border-gray-700 rounded-2xl bg-white dark:bg-[#1e1e1e]/90 shadow-lg backdrop-blur-md p-6">
        {questions?.map((q, idx) => {
          const isActive = activeQuestion === q._id;
          return (
            <div
              key={q._id}
              className={`pt-5 ${
                idx !== 0 ? 'border-t border-gray-200 dark:border-gray-700' : ''
              }`}
            >
              <dt>
                <button
                  onClick={() => toggleQuestion(q._id)}
                  aria-expanded={isActive}
                  aria-controls={`faq-desc-${q._id}`}
                  className="flex items-center justify-between w-full text-left focus:outline-none group"
                >
                  <span
                    className={`font-semibold text-lg transition-colors duration-300 ${
                      isActive
                        ? 'text-cyan-500 dark:text-cyan-400'
                        : 'text-gray-900 dark:text-gray-200'
                    }`}
                  >
                    {q.question}
                  </span>
                  <span
                    className={`ml-6 flex-shrink-0 text-cyan-500 dark:text-cyan-400 transform transition-transform duration-300 ${
                      isActive ? 'rotate-45' : 'rotate-0'
                    }`}
                  >
                    {isActive ? (
                      <HiMinus className="h-6 w-6" />
                    ) : (
                      <HiPlus className="h-6 w-6" />
                    )}
                  </span>
                </button>
              </dt>
              <dd
                id={`faq-desc-${q._id}`}
                className={`mt-3 text-gray-700 dark:text-gray-300 text-base font-Poppins max-w-[95%] transition-[max-height,opacity] duration-500 ease-in-out overflow-hidden ${
                  isActive ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {q.answer}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
};

export default FAQ;
