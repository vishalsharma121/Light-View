import React, { FormEvent, useEffect, useState } from 'react';
import { useMultistepForm } from '../../../../utils/hooks/useMultistepForm.tsx';
import { leaseCalculatorData } from '../data.ts';
import { FormSchema, formSchema, Utility } from './types.ts';

import submitHubspotForm from '../../../../utils/submitHubspotForm.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import solar_energy from './images/solar_energy.png';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../ui/form.tsx';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../../../ui/select.tsx';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../ui/tooltip.tsx';
import { Input } from '../../../ui/input.tsx';
import { Button } from '../../../ui/button.tsx';
import { ResultsDisplay } from './Results.tsx';
import { Spinner } from '../../../ui/spinner.tsx';
import { FieldValues } from '../fields.tsx';
import { Info } from 'lucide-react';
const hsFormId = '53560c2d-65ea-4a71-a0e9-adb97b433de3';

// Main calculator component with multi-step form
const Calculator: React.FC<{ fieldValues: FieldValues }> = ({
  fieldValues,
}) => {
  const { data } = fieldValues;
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      state: '',
      electric_utility: '',
      acreage: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  });
  const { currentStepIndex, next, back, isLastStep } = useMultistepForm(2);
  const [showResults, setShowResults] = useState(false);

  const selectedState = form.watch('state');
  const [availableUtilities, setAvailableUtilities] = useState<Utility[]>([]);

  useEffect(() => {
    const state = data.find((s) => s.value === selectedState);
    setAvailableUtilities(state?.utilities || []);
  }, [selectedState]);

  const onSubmit = async (data: FormSchema) => {
    console.log(data);
    await submitHubspotForm(hsFormId, data);
    setShowResults(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (currentStepIndex === 0) {
      await form.trigger(['state', 'electric_utility', 'acreage']);
    } else {
      await form.handleSubmit(onSubmit)();
    }

    if (Object.keys(form.formState.errors).length === 0) {
      next(); // No errors, proceed to the next step
    }
  };

  if (showResults)
    return (
      <ResultsDisplay fieldValues={fieldValues} formValues={form.getValues()} />
    );

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
                    
                  {currentStepIndex === 0 && (
                        <>
                    <li className='list_menu active'>1</li>
                    <li className='list_menu'>2</li>
                    <li className='list_menu'>3</li>
                    </>
                  )}
                  {currentStepIndex === 1 && (
                        <>
                        <li className='list_menu '>1</li>
                        <li className='list_menu active'>2</li>
                        <li className='list_menu'>3</li>
                        </>
                  )}
                  {currentStepIndex === 2 && (
                        <>
                        <li className='list_menu '>1</li>
                        <li className='list_menu '>2</li>
                        <li className='list_menu active'>3</li>
                        </>
                  )}
                      
                  </ul>
                </div>
              </div>
              <div className='form_col'>
                <div className='from_img_col'>
                  <img src={solar_energy} />
                </div>
                <div className='form_left_col'>
                  <Form {...form}>
                    <form
                      className="space-y-4 p-0 max-w-md mx-auto form_wrapper"
                      onSubmit={handleSubmit}
                    >
                      {currentStepIndex === 0 && (
                        <>
                          <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>State</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a State" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {data.map((state) => (
                                      <SelectItem key={state.value} value={state.value}>
                                        {state.display}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="electric_utility"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Utility</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  disabled={!availableUtilities.length}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue
                                        placeholder={
                                          availableUtilities.length
                                            ? 'Select a Utility'
                                            : 'Select a State first'
                                        }
                                      />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {availableUtilities.map((utility) => (
                                      <SelectItem
                                        key={utility.display}
                                        value={utility.display}
                                      >
                                        {utility.display}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="acreage"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                  Acreage
                                  <TooltipProvider delayDuration={100}>
                                    <Tooltip>
                                      <TooltipTrigger className="border-none bg-transparent text-inherit hover:bg-transparent hover:text-inherit">
                                        <Info className="w-4 fill-none" />
                                      </TooltipTrigger>
                                      <TooltipContent className="max-w-sm">
                                        <p>
                                          The current largest buildable acreage is 30. Not
                                          all land is buildable - please reach out for a
                                          detailed estimate.
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter your acreage (Maximum 30)"
                                    type="number"
                                    max={30}
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                      {currentStepIndex === 1 && (
                        <>
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First name</FormLabel>
                                <FormControl>
                                  <Input placeholder="First name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Last name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                  <Input
                                    type="phone"
                                    placeholder="Phone number"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}

                      
                      <div className="flex justify-between lease_calc_button_wrap">
                        {currentStepIndex > 0 && (
                          <Button className="lease_calc_form_back_btn" type="button" onClick={back} variant="secondary">
                            Back
                          </Button>
                        )}
                        <Button className="lease_calc_form_btn" type="submit" disabled={form.formState.isSubmitting}>
                          {isLastStep ? 'Submit' : 'Next'}
                          {form.formState.isSubmitting && (
                            <Spinner className="ml-2 text-white" />
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
      };

export default Calculator;
