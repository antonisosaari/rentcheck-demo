import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Phone, MoreVertical } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

interface Conversation {
  id: string;
  tenantName: string;
  propertyName: string;
  neighborhood: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  messages: Message[];
}

interface Message {
  id: string;
  sender: 'tenant' | 'landlord';
  text: string;
  time: string;
}

const conversations: Conversation[] = [
  {
    id: 'conv-1',
    tenantName: 'Matti Virtanen',
    propertyName: 'Fleminginkatu 15 B 23',
    neighborhood: 'Kallio',
    avatar: 'M',
    lastMessage: 'Sopii hyvin, kiitos nopeasta reagoinnista! 👍',
    lastMessageTime: '1 pv sitten',
    unread: 0,
    messages: [
      {
        id: 'm1',
        sender: 'tenant',
        text: 'Hei, kylpyhuoneen hana vuotaa hieman. Voisikohan sen korjauttaa?',
        time: '3.2.2026 klo 14:22',
      },
      {
        id: 'm2',
        sender: 'landlord',
        text: 'Kiitos ilmoituksesta! Olen tilannut putkimiehen, tulee torstaina klo 10-12. Sopiiko?',
        time: '4.2.2026 klo 09:15',
      },
      {
        id: 'm3',
        sender: 'tenant',
        text: 'Sopii hyvin, kiitos nopeasta reagoinnista! 👍',
        time: '4.2.2026 klo 10:03',
      },
    ],
  },
  {
    id: 'conv-2',
    tenantName: 'Anna Korhonen',
    propertyName: 'Hämeentie 42 A 8',
    neighborhood: 'Sörnäinen',
    avatar: 'A',
    lastMessage: 'Toki, kunhan käytät mattamaalia. Kiva kun pidät asunnosta huolta!',
    lastMessageTime: '5 pv sitten',
    unread: 0,
    messages: [
      {
        id: 'm4',
        sender: 'tenant',
        text: 'Moi! Onko ok jos maalaan makuuhuoneen seinän vaaleanharmaksi?',
        time: '29.1.2026 klo 18:45',
      },
      {
        id: 'm5',
        sender: 'landlord',
        text: 'Toki, kunhan käytät mattamaalia. Kiva kun pidät asunnosta huolta!',
        time: '31.1.2026 klo 11:20',
      },
    ],
  },
  {
    id: 'conv-3',
    tenantName: 'Juha Mäkinen',
    propertyName: 'Nilsiänkatu 8 C 12',
    neighborhood: 'Vallila',
    avatar: 'J',
    lastMessage: 'Selvä, kiitos tiedosta!',
    lastMessageTime: '2 vk sitten',
    unread: 0,
    messages: [
      {
        id: 'm6',
        sender: 'landlord',
        text: 'Hei Juha! Taloyhtiö tekee julkisivuremonttia 10.-14.2. Ikkunoita ei voi avata sinä aikana.',
        time: '22.1.2026 klo 10:00',
      },
      {
        id: 'm7',
        sender: 'tenant',
        text: 'Selvä, kiitos tiedosta!',
        time: '22.1.2026 klo 12:34',
      },
    ],
  },
];

export function Messages() {
  const [selectedConv, setSelectedConv] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');

  const activeConv = conversations.find((c) => c.id === selectedConv);

  return (
    <AnimatePresence mode="wait">
      {!selectedConv ? (
        <ConversationList
          key="list"
          conversations={conversations}
          onSelect={setSelectedConv}
        />
      ) : (
        activeConv && (
          <ChatView
            key={`chat-${activeConv.id}`}
            conversation={activeConv}
            onBack={() => setSelectedConv(null)}
            inputText={inputText}
            setInputText={setInputText}
          />
        )
      )}
    </AnimatePresence>
  );
}

function ConversationList({
  conversations,
  onSelect,
}: {
  conversations: Conversation[];
  onSelect: (id: string) => void;
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -10 }}
    >
      {/* Header */}
      <motion.div variants={item} className="mb-6">
        <h1 className="text-xl font-bold text-slate-100">Viestit</h1>
        <p className="text-xs text-slate-500 mt-1">Vuokralaiskommunikaatio</p>
      </motion.div>

      {/* Summary */}
      <motion.div variants={item} className="glass-green rounded-2xl p-4 mb-5 shadow-lg shadow-black/20">
        <div className="flex items-center gap-3">
          <span className="text-2xl">💬</span>
          <div>
            <p className="text-sm font-semibold text-green-400">
              {conversations.length} keskustelua
            </p>
            <p className="text-xs text-slate-500">
              Kaikki vuokralaiset tavoitettavissa
            </p>
          </div>
        </div>
      </motion.div>

      {/* Conversation List */}
      <div className="space-y-2">
        {conversations.map((conv) => (
          <motion.button
            key={conv.id}
            variants={item}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(conv.id)}
            className="w-full glass rounded-2xl p-4 flex items-center gap-3 text-left transition-all duration-300 hover:bg-white/[0.08] shadow-lg shadow-black/20"
          >
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500/30 to-green-600/15 border border-green-500/20 flex items-center justify-center shrink-0">
              <span className="text-green-400 font-bold text-lg">
                {conv.avatar}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <h3 className="font-semibold text-slate-100 text-sm truncate">
                  {conv.tenantName}
                </h3>
                <span className="text-[10px] text-slate-600 shrink-0 ml-2">
                  {conv.lastMessageTime}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mb-1">
                {conv.neighborhood} · {conv.propertyName}
              </p>
              <p className="text-xs text-slate-400 truncate">{conv.lastMessage}</p>
            </div>

            {/* Unread Badge */}
            {conv.unread > 0 && (
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-black">
                  {conv.unread}
                </span>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Footer */}
      <motion.div variants={item} className="mt-8 text-center">
        <p className="text-[10px] text-slate-600">
          Viestit kulkevat suojatun kanavan kautta
        </p>
      </motion.div>
    </motion.div>
  );
}

function ChatView({
  conversation,
  onBack,
  inputText,
  setInputText,
}: {
  conversation: Conversation;
  onBack: () => void;
  inputText: string;
  setInputText: (text: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col"
      style={{ minHeight: 'calc(100vh - 8rem)' }}
    >
      {/* Chat Header */}
      <div className="glass rounded-2xl p-4 mb-4 flex items-center gap-3 shadow-lg shadow-black/20">
        <button
          onClick={onBack}
          className="p-2 rounded-xl hover:bg-white/10 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 text-slate-400" />
        </button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500/30 to-green-600/15 border border-green-500/20 flex items-center justify-center shrink-0">
          <span className="text-green-400 font-bold">
            {conversation.avatar}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-slate-100 text-sm">
            {conversation.tenantName}
          </h2>
          <p className="text-[10px] text-slate-500">
            {conversation.neighborhood} · {conversation.propertyName}
          </p>
        </div>
        <button className="p-2 rounded-xl hover:bg-white/10 transition-all duration-300">
          <Phone className="w-4 h-4 text-slate-500" />
        </button>
        <button className="p-2 rounded-xl hover:bg-white/10 transition-all duration-300">
          <MoreVertical className="w-4 h-4 text-slate-500" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 mb-4">
        {conversation.messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            className={`flex ${msg.sender === 'landlord' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-lg shadow-black/20 ${
                msg.sender === 'landlord'
                  ? 'glass-chat-landlord rounded-br-md'
                  : 'glass-chat-tenant rounded-bl-md'
              }`}
            >
              <p className="text-sm text-slate-200 leading-relaxed">{msg.text}</p>
              <p
                className={`text-[10px] mt-1.5 ${
                  msg.sender === 'landlord'
                    ? 'text-green-400/50 text-right'
                    : 'text-slate-600'
                }`}
              >
                {msg.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="glass rounded-2xl p-3 flex items-center gap-2 shadow-lg shadow-black/20">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Kirjoita viesti..."
          className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-600 focus:outline-none px-2"
        />
        <button
          className={`p-2.5 rounded-xl transition-all duration-300 ${
            inputText.trim()
              ? 'bg-green-500 text-black hover:bg-green-400'
              : 'bg-white/5 text-slate-600'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
