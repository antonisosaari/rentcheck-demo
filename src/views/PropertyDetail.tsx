import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { TrendingDown, MapPin, FileText, ExternalLink, Calendar, User } from 'lucide-react';
import type { Property } from '../data/mockData';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

interface PropertyDetailProps {
  property: Property;
  onGenerateLetter: () => void;
  onBack: () => void;
}

export function PropertyDetail({ property, onGenerateLetter }: PropertyDetailProps) {
  const delta = property.marketEstimate - property.currentRent;
  const deltaPercent = ((delta / property.currentRent) * 100).toFixed(1);
  const avgComparable = Math.round(
    property.comparables.reduce((s, c) => s + c.rent, 0) / property.comparables.length
  );

  return (
    <motion.div variants={container} initial="hidden" animate="show" exit={{ opacity: 0, y: -10 }}>
      {/* Property Header Card */}
      <motion.div variants={item} className="bg-white rounded-xl border border-[#e2e8f0] p-5 mb-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-blue-100 text-[#2563eb] text-xs font-bold px-2.5 py-1 rounded-lg">
                {property.neighborhood}
              </span>
              <span className="text-sm text-gray-400">{property.type} · {property.size}m²</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">{property.address}</h1>
          </div>
        </div>

        {/* Rent Comparison */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-400 mb-1">Nykyinen vuokra</p>
            <p className="text-2xl font-bold text-gray-900">{property.currentRent} €</p>
            <p className="text-xs text-gray-400">/kk</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <p className="text-xs text-blue-400 mb-1">Markkina-arvio</p>
            <p className="text-2xl font-bold text-[#2563eb]">{property.marketEstimate} €</p>
            <p className="text-xs text-blue-400">/kk</p>
          </div>
          <div className="bg-red-50 rounded-lg p-3 text-center">
            <p className="text-xs text-red-400 mb-1">Erotus</p>
            <p className="text-2xl font-bold text-red-600">-{delta} €</p>
            <p className="text-xs text-red-400">-{deltaPercent}%</p>
          </div>
        </div>

        {/* Tenant & Lease Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            <span>{property.tenantName}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>Sopimus päättyy {property.leaseRenewalDays} pv kuluttua</span>
          </div>
        </div>
      </motion.div>

      {/* Delta Banner */}
      <motion.div variants={item} className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-4 mb-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
          <TrendingDown className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <p className="font-semibold text-red-900 text-sm">
            Vuokrasi on {delta} €/kk alle markkinahinnan
          </p>
          <p className="text-red-700 text-xs mt-0.5">
            Menetät vuodessa arviolta {delta * 12} € potentiaalista vuokratuloa
          </p>
        </div>
      </motion.div>

      {/* Market Chart */}
      <motion.div variants={item} className="bg-white rounded-xl border border-[#e2e8f0] p-5 mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Markkinavertailu</h2>
        <p className="text-sm text-gray-400 mb-4">Vuokrasi vs. alueen markkinahinta (12 kk)</p>
        <div className="h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={property.monthlyData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}€`}
                domain={['auto', 'auto']}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  fontSize: '13px',
                }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any, name: any) => [
                  `${value} €/kk`,
                  name === 'yourRent' ? 'Sinun vuokra' : 'Markkinahinta',
                ]}
              />
              <Legend
                formatter={(value: string) =>
                  value === 'yourRent' ? 'Sinun vuokra' : 'Markkinahinta'
                }
              />
              <Line
                type="monotone"
                dataKey="yourRent"
                stroke="#94a3b8"
                strokeWidth={2}
                strokeDasharray="6 4"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="marketAvg"
                stroke="#2563eb"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 5, fill: '#2563eb' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Comparable Listings */}
      <motion.div variants={item} className="bg-white rounded-xl border border-[#e2e8f0] p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Vertailukohteet</h2>
            <p className="text-sm text-gray-400">
              Keskihinta: <span className="font-semibold text-[#2563eb]">{avgComparable} €/kk</span>
            </p>
          </div>
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-lg">
            {property.comparables.length} kohdetta
          </span>
        </div>
        <div className="space-y-3">
          {property.comparables.map((comp) => {
            const compDelta = comp.rent - property.currentRent;
            const compDeltaPercent = ((compDelta / property.currentRent) * 100).toFixed(1);
            return (
              <div
                key={comp.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{comp.address}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                    <span>{comp.type} · {comp.size}m²</span>
                    <span>·</span>
                    <span>{comp.distance}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5">
                      <ExternalLink className="w-3 h-3" />
                      {comp.source}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-gray-900">{comp.rent} €/kk</p>
                  <p className={`text-xs font-medium ${compDelta > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {compDelta > 0 ? '+' : ''}{compDelta} € ({compDeltaPercent}%)
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Generate Letter CTA */}
      <motion.div variants={item}>
        <button
          onClick={onGenerateLetter}
          className="w-full bg-gradient-to-r from-[#2563eb] to-blue-600 text-white rounded-xl p-4 flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-[0.99]"
        >
          <FileText className="w-5 h-5" />
          <span className="font-semibold">Luo vuokrankorotuskirje</span>
        </button>
        <p className="text-center text-xs text-gray-400 mt-2">
          Tekoäly laatii vuokrankorotusilmoituksen markkinadataan perustuen
        </p>
      </motion.div>
    </motion.div>
  );
}
