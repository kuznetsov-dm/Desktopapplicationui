import { useState } from 'react';

interface RightPanelProps {
  selectedMeeting: string | null;
  onSelectMeeting: (meetingId: string) => void;
}

interface Meeting {
  id: string;
  name: string;
  date: string;
  duration: string;
  status: 'success' | 'processing' | 'error';
}

export function RightPanel({ selectedMeeting, onSelectMeeting }: RightPanelProps) {
  const [meetings] = useState<Meeting[]>([
    {
      id: '2026-01-13_10-15-00_meeting',
      name: '2026-01-13_10-15-00_meeting',
      date: '2026-01-13',
      duration: '18:32',
      status: 'success',
    },
    {
      id: '2026-01-12_14-30-00_team-sync',
      name: '2026-01-12_14-30-00_team-sync',
      date: '2026-01-12',
      duration: '52:15',
      status: 'success',
    },
    {
      id: '2026-01-11_09-00-00_standup',
      name: '2026-01-11_09-00-00_standup',
      date: '2026-01-11',
      duration: '15:20',
      status: 'success',
    },
  ]);

  const [activeTab, setActiveTab] = useState<'transcript' | 'summary' | 'edited'>('transcript');

  const mockTranscript = `[00:00:00] Добрый день, коллеги. Начинаем наше еженедельное совещание по проекту AI Meeting Manager.

[00:00:08] Привет всем! Готов обсудить прогресс.

[00:00:12] Отлично. Давайте начнем с обзора выполненных задач. На этой неделе мы завершили реализацию основного пайплайна обработки. Теперь система может принимать аудиофайлы, транскрибировать их через Whisper, и генерировать саммари.

[00:00:32] Это большой прогресс. Как обстоят дела с версионированием артефактов?

[00:00:38] Система версионирования работает корректно. Мы реализовали механизм fingerprint для каждого узла результатов, и теперь можем отслеживать все изменения. Cache-hit работает отлично.

[00:00:52] Отличные новости. А что с UI?

[00:00:56] UI практически готов. Мы создали все основные панели: обработка файлов, история встреч, просмотр артефактов. Осталось только отполировать детали.

[01:05] Есть ли какие-то блокеры или проблемы?

[01:10] На данный момент критических проблем нет. Единственное - нужно оптимизировать скорость индексации для больших транскриптов.

[01:20] Хорошо. Давайте продолжим в том же темпе. Планируем демо на следующей неделе.`;

  const mockSummary = `# Резюме совещания: AI Meeting Manager

## Дата и время
13 января 2026, 10:15

## Продолжительность
18 минут 32 секунды

## Основные темы

### 1. Прогресс проекта
Команда завершила реализацию основного пайплайна обработки встреч. Система теперь может:
- Принимать аудиофайлы различных форматов
- Транскрибировать через Whisper.cpp
- Генерировать автоматические саммари

### 2. Версионирование
Реализован полноценный механизм версионирования артефактов:
- Fingerprint для каждого узла результатов
- Отслеживание всех изменений
- Cache-hit механизм работает корректно

### 3. Пользовательский интерфейс
UI практически завершен. Созданы все ключевые компоненты:
- Панель обработки файлов
- История встреч
- Просмотр артефактов
- Осталась финальная полировка

### 4. Текущие задачи
- Оптимизация индексации для больших транскриптов
- Подготовка к демо на следующей неделе
- Финальное тестирование всех компонентов

## Решения
- Продолжить разработку в текущем темпе
- Запланировать демонстрацию на следующую неделю

## Участники
- Руководитель проекта
- Разработчик 1
- Разработчик 2`;

  const mockEdited = `# Структурированный анализ встречи (TF-IDF)

## Ключевые термины
- **AI Meeting Manager** (вес: 0.87)
- **пайплайн обработки** (вес: 0.76)
- **версионирование** (вес: 0.68)
- **Whisper транскрибация** (вес: 0.65)
- **UI компоненты** (вес: 0.58)

## Извлеченные действия

### Высокий приоритет
- [ ] Оптимизировать индексацию для больших транскриптов
- [ ] Подготовить демо на следующую неделю
- [ ] Протестировать все компоненты системы

### Средний приоритет
- [ ] Отполировать детали UI
- [ ] Документировать API пайплайна
- [ ] Подготовить примеры использования

## Технические детали

### Завершенные компоненты
- Основной пайплайн обработки ✓
- Система fingerprint и cache-hit ✓
- Версионирование артефактов ✓
- UI панели (обработка, история, просмотр) ✓

### В работе
- Оптимизация индексации
- Финальная полировка UI
- Подготовка к демонстрации

## Метрики встречи
- Продолжительность: 18:32
- Количество спикеров: 3
- Количество слов: ~2,300
- Язык: Русский
- Тональность: Позитивная

## Темы по частоте упоминаний
1. Разработка и прогресс (45%)
2. Технические детали (30%)
3. Планирование (15%)
4. Организационные вопросы (10%)`;

  const getContent = () => {
    switch (activeTab) {
      case 'transcript':
        return mockTranscript;
      case 'summary':
        return mockSummary;
      case 'edited':
        return mockEdited;
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#F8FAFC] dark:bg-[#1E293B]">
      {/* Meeting History */}
      <div className="h-[40%] border-b border-gray-200 dark:border-gray-700">
        <div className="bg-white dark:bg-[#334155] h-full flex flex-col">
          <div className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#2D3748] font-semibold text-sm text-gray-900 dark:text-gray-100">
            📋 Meeting History
          </div>
          <div className="flex-1 overflow-auto p-2">
            <div className="space-y-1">
              {meetings.map((meeting) => (
                <div
                  key={meeting.id}
                  onClick={() => onSelectMeeting(meeting.id)}
                  className={`p-3 rounded cursor-pointer transition-colors ${
                    selectedMeeting === meeting.id
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-gray-50 dark:bg-[#2D3748] hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium text-sm truncate">{meeting.name}</div>
                    {meeting.status === 'success' && (
                      <div className={`text-xs px-2 py-0.5 rounded ${
                        selectedMeeting === meeting.id
                          ? 'bg-white/20'
                          : 'bg-[#10B981] text-white'
                      }`}>
                        ✅
                      </div>
                    )}
                  </div>
                  <div className={`text-xs ${
                    selectedMeeting === meeting.id
                      ? 'text-white/80'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {meeting.date} • {meeting.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white dark:bg-[#334155] flex flex-col h-full">
          <div className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#2D3748] font-semibold text-sm text-gray-900 dark:text-gray-100">
            📄 Content
          </div>
          
          {!selectedMeeting ? (
            <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
              No meeting selected
            </div>
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Tab Headers */}
              <div className="flex border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-[#2D3748]">
                <button
                  onClick={() => setActiveTab('transcript')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'transcript'
                      ? 'border-[#2563EB] text-[#2563EB]'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  📝 Transcript
                </button>
                <button
                  onClick={() => setActiveTab('summary')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'summary'
                      ? 'border-[#2563EB] text-[#2563EB]'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  📋 Summary
                </button>
                <button
                  onClick={() => setActiveTab('edited')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'edited'
                      ? 'border-[#2563EB] text-[#2563EB]'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  ✏️ EDITED
                </button>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-auto p-4 bg-white dark:bg-[#2D3748]">
                <pre className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap font-sans leading-relaxed">
                  {getContent()}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
