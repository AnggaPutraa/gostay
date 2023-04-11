'use client';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useState, useCallback } from 'react';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { yupResolver } from "@hookform/resolvers/yup";

import axios from 'axios';
import * as Yup from "yup";
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = Yup.object().shape({
        email: Yup.string().email("An valid email is required").required("Email is required"),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password length should be at least 8 characters")
            .max(12, "Password cannot exceed more than 12 characters"),
    });

    const {
        register,
        handleSubmit,
        watch,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
        resolver: yupResolver(formSchema),
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((err) => {
                toast.error('Something Went Wrong');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Welcome to gostay'
                subtitle='Create an account'
            />
            <Input
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='name'
                label='Name'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='password'
                label='Password'
                type='password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => { signIn('google') }}
            />
            <Button
                outline
                label='Continue with Github'
                icon={AiFillGithub}
                onClick={() => {
                    signIn('github');
                }}
            />
            <div className='text-neutral-500 text-center mt-2 font-light'>
                <div className='flex flex-row items-center justify-center gap-2'>
                    <div>
                        Already have an account?
                    </div>
                    <div
                        onClick={toggle}
                        className='text-neutral-800 cursor-pointer hover:underline'>
                        Sign Up
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title='Register'
            actionLabel='Continue'
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default RegisterModal;