import { Island } from '@hubspot/cms-components';
import '../../../styles/tailwind.css';
import '../../../styles/Custom.css';
import { FieldValues } from './fields.tsx';

//@ts-ignore
import Calculator from './components/index?island';

export const Component = ({ fieldValues }: { fieldValues: FieldValues }) => {
  return (
    <div className="flex flex-col items-center">
      <Island
        module={Calculator}
        fieldValues={fieldValues}
        wrapperClassName="w-full"
      />
    </div>
  );
};

export { fields } from './fields.tsx';

export const meta = {
  label: `Lease Calculator new`,
};
