export interface Property {
  id: string;
  neighborhood: string;
  address: string;
  type: string;
  size: number;
  currentRent: number;
  marketEstimate: number;
  leaseRenewalDays: number;
  leaseStart: string;
  leaseEnd: string;
  tenantName: string;
  monthlyData: MonthlyData[];
  comparables: Comparable[];
}

export interface MonthlyData {
  month: string;
  yourRent: number;
  marketAvg: number;
}

export interface Comparable {
  id: string;
  address: string;
  type: string;
  size: number;
  rent: number;
  source: string;
  listedDate: string;
  distance: string;
}

export interface Alert {
  id: string;
  type: 'listing' | 'renewal' | 'market' | 'recommendation';
  title: string;
  description: string;
  timestamp: string;
  propertyId?: string;
  severity: 'info' | 'warning' | 'urgent';
  icon: string;
}

const generateMonthlyData = (
  baseRent: number,
  baseMarket: number,
  variance: number = 20
): MonthlyData[] => {
  const months = [
    'Hel 25', 'Maa 25', 'Huh 25', 'Tou 25', 'Kes 25', 'Hei 25',
    'Elo 25', 'Syy 25', 'Lok 25', 'Mar 25', 'Jou 25', 'Tam 26'
  ];
  
  return months.map((month, i) => ({
    month,
    yourRent: baseRent,
    marketAvg: Math.round(baseMarket + (i * variance / 3) + (Math.sin(i * 0.8) * variance * 0.4)),
  }));
};

export const properties: Property[] = [
  {
    id: 'kallio-1',
    neighborhood: 'Kallio',
    address: 'Fleminginkatu 15 B 23',
    type: '2h+k',
    size: 48,
    currentRent: 950,
    marketEstimate: 1077,
    leaseRenewalDays: 127,
    leaseStart: '2024-06-01',
    leaseEnd: '2026-06-01',
    tenantName: 'Matti Virtanen',
    monthlyData: generateMonthlyData(950, 1010, 25),
    comparables: [
      {
        id: 'c1',
        address: 'Helsinginkatu 22 A 14',
        type: '2h+k',
        size: 45,
        rent: 1050,
        source: 'Oikotie',
        listedDate: '2026-01-28',
        distance: '250m',
      },
      {
        id: 'c2',
        address: 'Siltasaarenkatu 8 C 7',
        type: '2h+k',
        size: 50,
        rent: 1120,
        source: 'Vuokraovi',
        listedDate: '2026-01-15',
        distance: '400m',
      },
      {
        id: 'c3',
        address: 'Pengerkatu 11 B 31',
        type: '2h+k',
        size: 47,
        rent: 1080,
        source: 'Oikotie',
        listedDate: '2026-02-01',
        distance: '180m',
      },
      {
        id: 'c4',
        address: 'Vaasankatu 6 A 9',
        type: '2h+kk',
        size: 52,
        rent: 1150,
        source: 'Vuokraovi',
        listedDate: '2026-01-20',
        distance: '350m',
      },
      {
        id: 'c5',
        address: 'Fleminginkatu 28 D 12',
        type: '2h+k',
        size: 46,
        rent: 985,
        source: 'Oikotie',
        listedDate: '2026-02-03',
        distance: '120m',
      },
    ],
  },
  {
    id: 'sornainen-1',
    neighborhood: 'Sörnäinen',
    address: 'Hämeentie 42 A 8',
    type: '3h+k',
    size: 65,
    currentRent: 1200,
    marketEstimate: 1340,
    leaseRenewalDays: 34,
    leaseStart: '2024-03-01',
    leaseEnd: '2026-03-11',
    tenantName: 'Anna Korhonen',
    monthlyData: generateMonthlyData(1200, 1260, 30),
    comparables: [
      {
        id: 'c6',
        address: 'Hämeentie 58 B 4',
        type: '3h+k',
        size: 68,
        rent: 1380,
        source: 'Oikotie',
        listedDate: '2026-01-22',
        distance: '200m',
      },
      {
        id: 'c7',
        address: 'Kurikkala 3 A 15',
        type: '3h+k',
        size: 62,
        rent: 1290,
        source: 'Vuokraovi',
        listedDate: '2026-01-30',
        distance: '450m',
      },
      {
        id: 'c8',
        address: 'Sörnäistenkatu 14 C 22',
        type: '3h+kk',
        size: 70,
        rent: 1420,
        source: 'Oikotie',
        listedDate: '2026-02-02',
        distance: '300m',
      },
      {
        id: 'c9',
        address: 'Vilhovuorenkatu 7 B 6',
        type: '3h+k',
        size: 64,
        rent: 1310,
        source: 'Vuokraovi',
        listedDate: '2026-01-18',
        distance: '380m',
      },
    ],
  },
  {
    id: 'vallila-1',
    neighborhood: 'Vallila',
    address: 'Nilsiänkatu 8 C 12',
    type: '1h+k',
    size: 32,
    currentRent: 680,
    marketEstimate: 720,
    leaseRenewalDays: 245,
    leaseStart: '2025-10-01',
    leaseEnd: '2027-10-01',
    tenantName: 'Liisa Mäkinen',
    monthlyData: generateMonthlyData(680, 695, 12),
    comparables: [
      {
        id: 'c10',
        address: 'Nilsiänkatu 14 A 3',
        type: '1h+k',
        size: 30,
        rent: 710,
        source: 'Oikotie',
        listedDate: '2026-01-25',
        distance: '100m',
      },
      {
        id: 'c11',
        address: 'Mäkelänkatu 48 B 19',
        type: '1h+kk',
        size: 34,
        rent: 750,
        source: 'Vuokraovi',
        listedDate: '2026-02-01',
        distance: '280m',
      },
      {
        id: 'c12',
        address: 'Sturenkatu 29 C 8',
        type: '1h+k',
        size: 31,
        rent: 695,
        source: 'Oikotie',
        listedDate: '2026-01-12',
        distance: '350m',
      },
      {
        id: 'c13',
        address: 'Aleksis Kiven katu 60 A 2',
        type: '1h+k',
        size: 33,
        rent: 735,
        source: 'Vuokraovi',
        listedDate: '2026-01-29',
        distance: '420m',
      },
    ],
  },
];

export const alerts: Alert[] = [
  {
    id: 'a1',
    type: 'listing',
    title: 'Uusi vertailukohde Kalliossa',
    description: 'Vaasankatu 6 A: 2h+kk 52m² listattu hintaan 1 150 €/kk — 21 % nykyistä vuokraasi korkeampi.',
    timestamp: '2026-02-05T14:30:00',
    propertyId: 'kallio-1',
    severity: 'warning',
    icon: '📊',
  },
  {
    id: 'a2',
    type: 'renewal',
    title: 'Vuokrasopimuksen uusiminen lähestyy',
    description: 'Sörnäisten asunnon (Hämeentie 42 A) vuokrasopimus päättyy 34 päivän kuluttua. Markkinahinta on 140 €/kk nykyistä vuokraa korkeampi.',
    timestamp: '2026-02-05T09:00:00',
    propertyId: 'sornainen-1',
    severity: 'urgent',
    icon: '⏰',
  },
  {
    id: 'a3',
    type: 'market',
    title: 'Vallilan markkinahinnat nousseet',
    description: 'Vallilan alueen keskivuokra on noussut 4,2 % tällä vuosineljänneksellä. Yksiöiden kysyntä kasvussa.',
    timestamp: '2026-02-04T16:00:00',
    propertyId: 'vallila-1',
    severity: 'info',
    icon: '📈',
  },
  {
    id: 'a4',
    type: 'listing',
    title: 'Kallio: markkinahinta ylittänyt 1 100 €',
    description: 'Kallion 2h+k asuntojen keskivuokra on ensimmäistä kertaa yli 1 100 €/kk. Fleminginkadun asuntosi vuokra on nyt 13,4 % alle markkinahinnan.',
    timestamp: '2026-02-03T11:15:00',
    propertyId: 'kallio-1',
    severity: 'warning',
    icon: '🔔',
  },
  {
    id: 'a5',
    type: 'recommendation',
    title: 'Suositus: vuokrankorotus Kalliossa',
    description: 'Analyysin perusteella Fleminginkadun asunnon vuokra on mahdollista korottaa tasolle 1 050–1 080 €/kk markkinadatan perusteella.',
    timestamp: '2026-02-02T08:00:00',
    propertyId: 'kallio-1',
    severity: 'info',
    icon: '💡',
  },
  {
    id: 'a6',
    type: 'market',
    title: 'Sörnäisten vuokramarkkina kiristynyt',
    description: 'Sörnäisten 3h+k asuntojen tarjonta laskenut 15 % viime kuussa. Vuokranantajan markkina vahvistuu.',
    timestamp: '2026-02-01T13:45:00',
    propertyId: 'sornainen-1',
    severity: 'info',
    icon: '📊',
  },
  {
    id: 'a7',
    type: 'listing',
    title: 'Uusi vertailukohde Sörnäisissä',
    description: 'Sörnäistenkatu 14: 3h+kk 70m² listattu hintaan 1 420 €/kk. Vastaavan kokoinen asuntosi on 18,3 % edullisempi.',
    timestamp: '2026-01-31T10:20:00',
    propertyId: 'sornainen-1',
    severity: 'warning',
    icon: '🏠',
  },
];

export const getSummaryStats = () => {
  const totalProperties = properties.length;
  const totalDelta = properties.reduce((sum, p) => sum + (p.marketEstimate - p.currentRent), 0);
  const avgDelta = Math.round(totalDelta / totalProperties);
  const nextRenewal = Math.min(...properties.map(p => p.leaseRenewalDays));
  const totalMonthlyLoss = totalDelta;
  const annualLoss = totalMonthlyLoss * 12;
  
  return {
    totalProperties,
    avgDelta,
    nextRenewal,
    totalMonthlyLoss,
    annualLoss,
  };
};
