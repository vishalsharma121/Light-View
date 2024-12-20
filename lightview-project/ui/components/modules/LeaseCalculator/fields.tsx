import {
  ModuleFields,
  TextField,
  FieldGroup,
  BooleanField,
  RepeatedFieldGroup,
  NumberField,
  LinkField,
  RichTextField,
} from '@hubspot/cms-components/fields';
import { leaseCalculatorData } from './data.ts';

export type FieldValues = {
  example_field: string;
  data: {
    display: string;
    value: string;
    utilities: {
      display: string;
      leasePerAcre: number;
    }[];
  }[];
  results: {
    title: string;
    state: string;
    electric_utility: string;
    acreage: string;
    calculationsTitle: string;
    yearlyLeasePerAcre: string;
    totalYearlyLease: string;
    totalMonthlyLease: string;
    link: {
      no_follow: boolean;
      open_in_new_tab: boolean;
      url: {
        type: string;
        href: string;
        content_id: string;
      };
    };
  };
  disclaimer: string;
};

const DataField = () => (
  <RepeatedFieldGroup
    occurrence={{ min: 1, default: 3 }}
    name="data"
    label="Data"
    default={leaseCalculatorData}
  >
    <TextField name="display" label="Name" />
    <TextField name="value" label="Value" />
    <RepeatedFieldGroup
      occurrence={{ min: 1, default: 3 }}
      name="utilities"
      label="Utilities"
    >
      <TextField name="display" label="Name" />
      <NumberField name="leasePerAcre" label="Lease Per Acre" />
    </RepeatedFieldGroup>
  </RepeatedFieldGroup>
);

const ResultsField = () => (
  <FieldGroup name="results" label="Results">
    <TextField name="title" label="Title" />

    <TextField name="state" label="State" default="State:" />
    <TextField
      name="electric_utility"
      label="Electric Utility"
      default="Utility:"
    />
    <TextField name="acreage" label="Acreage" default="Acreage:" />

    <TextField
      name="calculationsTitle"
      label="Calculations Title"
      default="Lease calculations:"
    />

    <TextField
      name="yearlyLeasePerAcre"
      label="Yearly Lease Per Acre"
      default="Yearly Lease / Acre:"
    />
    <TextField
      name="totalYearlyLease"
      label="Total Yearly Lease"
      default="Total Yearly Lease:"
    />
    <TextField
      name="totalMonthlyLease"
      label="Total Monthly Lease"
      default="Total Monthly Lease:"
    />
    <LinkField
      name="link"
      label="Link"
      supportedTypes={['CONTENT', 'EXTERNAL']}
      default={{
        url: {
          type: 'EXTERNAL',
          href: 'https://www.hubspot.com',
          content_id: null,
        },
      }}
    />
  </FieldGroup>
);

export const fields = (
  <ModuleFields>
    <DataField />
    <ResultsField />
    <RichTextField
      name="disclaimer"
      label="Disclaimer"
      default="These results only showcase approximate value of your land. The price of the lease may vary. For better estimations reach out to our team directly."
    />
  </ModuleFields>
);
