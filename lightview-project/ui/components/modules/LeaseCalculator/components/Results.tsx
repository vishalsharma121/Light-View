import { SquareArrowOutUpRight } from 'lucide-react';
import { RichText } from '@hubspot/cms-components';

import { Button } from '../../../ui/button.js';
import { Input } from '../../../ui/input.tsx';
import { Label } from '../../../ui/label.tsx';

import toUpperCaseFirst from '../../../../utils/toUpperCaseFirst.ts';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select.tsx';

import { FormSchema, Utility } from './types.ts';
import { FieldValues } from '../fields.tsx';
import { useEffect, useMemo, useState } from 'react';

export const ResultsDisplay: React.FC<{
  fieldValues: FieldValues;
  formValues: FormSchema;
}> = ({ fieldValues, formValues: initialValues }) => {
  const { data, results } = fieldValues;

  const [state, setState] = useState(initialValues.state);
  const [acreage, setAcreage] = useState(parseInt(initialValues.acreage));
  const [electricUtility, setElectricUtility] = useState(
    initialValues.electric_utility,
  );

  const [availableUtilities, setAvailableUtilities] = useState<Utility[]>([]);

  const yearlyLeasePerAcre = useMemo(() => {
    const selectedState = data.find((s) => s.value === state);
    const selectedUtility = selectedState?.utilities.find(
      (u) => u.display === electricUtility,
    );
    return selectedUtility?.leasePerAcre || 0;
  }, [electricUtility, state]);

  useEffect(() => {
    const stateData = data.find((s) => s.value === state);
    setAvailableUtilities(stateData?.utilities || []);
    if (stateData.utilities.length === 1) {
      setElectricUtility(stateData.utilities[0].display);
    }
  }, [state]);

  const handleAcreageChange = (e: any) => {
    const newAcreage = e.target.value;
    if (newAcreage > 30) {
      setAcreage(30);
    } else {
      setAcreage(newAcreage);
    }
  };

  const land = acreage; // Assuming this is in acres
  const totalYearlyLease = land * yearlyLeasePerAcre;
  const totalMonthlyLease = totalYearlyLease / 12;

  return (
    <>

      <section className='form_section'>
        <div className='container'>
          <div className='inner_wrapper'>
            <div className='form_box'>
              <div className='form_title_wrapper'>
                <div className='form_title'>
                  <h1>Find out How Much You Can Earn From Your Land</h1>
                </div>
                <div className='form_list'>
                  <ul className='list_menu_item'>
                    <li className='list_menu '>1</li>
                    <li className='list_menu'>2</li>
                    <li className='list_menu active'>3</li>
                  </ul>
                </div>
              </div>
              <div className='form_col_two'>
              <div className="flex flex-col items-center lease_calc_result_div">
                {results.title && (
                  <h3 className="text-3xl font-bold text-center mb-8">{results.title}</h3>
                )}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 w-full max-w-4xl items-center justify-center  form_row">
                  <div className="space-y-4 col-span-1 md:col-span-7">
                    <div className="flex flex-wrap gap-4 form_calc">
                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-lg">
                          {results.state}
                        </Label>
                        <Select value={state} onValueChange={setState}>
                          <SelectTrigger className="w-[220px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {data.map((state) => (
                              <SelectItem key={state.value} value={state.value}>
                                {state.display}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="utility" className="text-lg">
                          {results.electric_utility}
                        </Label>
                        <Select
                          value={electricUtility}
                          onValueChange={setElectricUtility}
                        >
                          <SelectTrigger className="w-[220px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {availableUtilities.map((utility) => (
                              <SelectItem key={utility.display} value={utility.display}>
                                {utility.display}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="acreage" className="text-lg">
                          {results.acreage}
                        </Label>
                        <Input
                          type="number"
                          value={acreage}
                          className="w-[220px]"
                          min={1}
                          max={30}
                          onChange={handleAcreageChange}
                        />
                      </div>
                    </div>
                    {results.link.url.href && (
                  <Button asChild className="mt-12 button_form_reach_out">
                    <a href={results.link.url.href} target="_blank">
                      Reach out
                      <SquareArrowOutUpRight
                        size={16}
                        className="inline-block ml-2 fill-none"
                      />
                    </a>
                  </Button>
                )}
                <div className='form_bottom_content'>
                  <p>These  results only showcase approximate value of your land. The price of the  lease may vary. For precise lease values contact our team directly.</p>
                </div>
                  </div>
                  <div className="bg-white rounded p-8 shadow-md space-y-6 border border-orange-300/70 col-span-1 md:col-span-5">
                  <div className='sub_title'>
                    <h1>Calculation Results</h1>
                  </div>
                    <div className="flex justify-center flex-col items-center gap-4 border-b pb-6 border-slate-800">
                      {results.calculationsTitle && (
                        <h2 className=" text-center font-semibold uppercase">
                          {results.calculationsTitle}
                        </h2>
                      )}
                      <h3 className="text-3xl font-medium">
                        <strong className="">
                          {' '}
                          ${totalYearlyLease.toLocaleString()}{' '}
                          <span className="text-sm font-normal">/ year</span>
                        </strong>
                      </h3>
                    </div>

                    <div className="space-y-8">
                      <p className="flex justify-between">
                        {results.yearlyLeasePerAcre}
                        <strong className="">
                          {' '}
                          ${yearlyLeasePerAcre.toLocaleString()}{' '}
                          <span className="text-black text-sm font-normal">/ acre</span>
                        </strong>
                      </p>
                      <div>
                        <p className="flex justify-between">
                          {results.totalYearlyLease}
                          <strong className="">
                            {' '}
                            ${totalYearlyLease.toLocaleString()}{' '}
                            <span className="text-black text-sm font-normal">/ year</span>
                          </strong>
                        </p>
                        <div className="ml-2 mt-2 space-y-1">
                          {/* 10 year and 20 year lease */}
                          <p className="flex justify-between">
                            10 Years
                            <strong className="">
                              {' '}
                              ${(totalYearlyLease * 10).toLocaleString()}
                            </strong>
                          </p>
                          <p className="flex justify-between">
                            20 Years
                            <strong className="">
                              {' '}
                              ${(totalYearlyLease * 20).toLocaleString()}
                            </strong>
                          </p>
                        </div>
                      </div>
                      <p className="flex justify-between">
                        {results.totalMonthlyLease}
                        <strong className="">
                          {' '}
                          ${Math.floor(totalMonthlyLease).toLocaleString()}{' '}
                          <span className="text-black text-sm font-normal">/ month</span>
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              
                <RichText
                  fieldPath="disclaimer"
                  tag="span" className="max-w-4xl text-neutral-500 text-xs pt-12 col-span-1 md:col-span-2"
                />
              </div>
              </div>
             
            </div>
          </div>
        </div>
      </section>

    </>

  );
};
