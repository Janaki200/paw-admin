'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { PawPrintIcon } from '@/components/icons/paw-print';
import { Admin } from '@/app/models/admin';
import React, { useState } from 'react';
import adminServices from '@/app/services/adminServices';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  role: z.enum(['clinic', 'daycare'], {
    required_error: 'You need to select an admin role.',
  }),
  place:z.string().min(2, { message: 'Place must be at least 2 characters.' }),
  phoneNumber:z.string().min(2, { message: 'Name must be at least 2 characters.' }),
});

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [admin, setAdmin] = useState<Admin>({email: "", name: "", password: "", role: "", place: "", phoneNumber:""});
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: undefined,
      place: '',
      phoneNumber: '',
    },
  });

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   // Placeholder for registration logic
    
  //   toast({
  //     title: 'Registration Successful',
  //     description: `Welcome, ${values.name}! Your ${values.role} admin account has been created.`,
  //   });
  //   // Redirect to login page after successful registration
  //   
  // }

  const onSubmit = async  (e: React.FormEvent) => {
    e.preventDefault();
    if (!admin.name || !admin.password || !admin.role || !admin.email || !admin.place || !admin.phoneNumber) return;
    try {
      await adminServices.registerAdmin(admin)
      setAdmin({email: "", name: "", password: "", role: "", place: "", phoneNumber:""})
         toast({
        title: 'Registration Successful',
        description: `Welcome, ${admin.name}! Your ${admin.role} admin account has been created.`,
      });
    router.push('/login');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: 'Registration Failed',
          description: `${error}`,
        });
      } else {
        toast({
          title: 'Registration Failed',
          description: `${error}`,
        });
      }
  }
  }

  return (
    <>
      <div className="mb-6 flex flex-col space-y-2 text-center">
         <PawPrintIcon className="mx-auto h-8 w-8 text-primary" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an Admin Account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your details below to register
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
           <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Clinic/Daycare Name" {...field}
                   onChange={ (e) => {
                    field.onChange(e);
                    setAdmin((prev) => ( {...prev, name: e.target.value}))
                  }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="place"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Your Clinic/Daycare Location" {...field}
                   onChange={ (e) => {
                    field.onChange(e);
                    setAdmin((prev) => ( {...prev, place: e.target.value}))
                  }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Your Clinic/Daycare Phone Number" {...field}
                   onChange={ (e) => {
                    field.onChange(e);
                    setAdmin((prev) => ( {...prev, phoneNumber: e.target.value}))
                  }}
                  />
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
                  <Input placeholder="admin@paw.com" {...field} 
                  onChange={ (e) => {
                    field.onChange(e);
                    setAdmin((prev) => ( {...prev, email: e.target.value}))
                  }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} 
                   onChange={ (e) => {
                    field.onChange(e);
                    setAdmin((prev) => ( {...prev, password: e.target.value}))
                  }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Select your role</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value); // update form state
                      setAdmin((prev) => ({ ...prev, role: value })); // update local state
                    }}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="clinic" />
                      </FormControl>
                      <FormLabel className="font-normal">Clinic</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="daycare" />
                      </FormControl>
                      <FormLabel className="font-normal">Daycare</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            Register
          </Button>
        </form>
      </Form>
      <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link
          href="/login"
          className="underline underline-offset-4 hover:text-primary"
        >
          Login
        </Link>
      </p>
    </>
  );
}
