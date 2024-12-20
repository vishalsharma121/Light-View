import { State } from './components/types.ts';

export const leaseCalculatorData: State[] = [
  {
    display: 'California',
    value: 'california',
    utilities: [
      { display: 'PG&E', leasePerAcre: 2400 },
      { display: 'SCE', leasePerAcre: 2500 },
      { display: 'SDG&E', leasePerAcre: 2300 },
    ],
  },
  {
    display: 'Minnesota',
    value: 'minnesota',
    utilities: [{ display: 'Xcel', leasePerAcre: 2200 }],
  },
  {
    display: 'Ohio',
    value: 'ohio',
    utilities: [
      { display: 'PG&E', leasePerAcre: 2500 },
      { display: 'SCE', leasePerAcre: 2500 },
      { display: 'SDG&E', leasePerAcre: 2500 },
      { display: 'Xcel', leasePerAcre: 2500 },
      { display: 'PECO', leasePerAcre: 2500 },
    ],
  },
  {
    display: 'Michigan',
    value: 'michigan',
    utilities: [
      { display: 'PG&E', leasePerAcre: 2500 },
      { display: 'SCE', leasePerAcre: 2500 },
      { display: 'SDG&E', leasePerAcre: 2500 },
      { display: 'Xcel', leasePerAcre: 2500 },
      { display: 'PECO', leasePerAcre: 2500 },
    ],
  },
  {
    display: 'Maryland',
    value: 'maryland',
    utilities: [
      { display: 'PG&E', leasePerAcre: 5100 },
      { display: 'SCE', leasePerAcre: 5100 },
      { display: 'SDG&E', leasePerAcre: 5100 },
      { display: 'Xcel', leasePerAcre: 5100 },
      { display: 'PECO', leasePerAcre: 5100 },
    ],
  },
  {
    display: 'Wisconsin',
    value: 'wisconsin',
    utilities: [
      { display: 'PG&E', leasePerAcre: 2500 },
      { display: 'SCE', leasePerAcre: 2500 },
      { display: 'SDG&E', leasePerAcre: 2500 },
      { display: 'Xcel', leasePerAcre: 2500 },
      { display: 'PECO', leasePerAcre: 2500 },
    ],
  },
  {
    display: 'Pennsylvania',
    value: 'pennsylvania',
    utilities: [
      { display: 'PECO', leasePerAcre: 4000 },
      { display: 'PG&E', leasePerAcre: 3000 },
      { display: 'SCE', leasePerAcre: 3000 },
      { display: 'SDG&E', leasePerAcre: 3000 },
      { display: 'Xcel', leasePerAcre: 3000 },
    ],
  },
];
