'use client'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { SafeUser } from '@/app/types';

interface UserMenuProps {
    currentUser?: SafeUser | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={() => { }}
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    gostay your home
                </div>
                <div
                    onClick={toggleOpen}
                    className="p-4 md:py-1.5 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                    <AiOutlineMenu />
                    <div className='hidden md:block'>
                        <Avatar />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 md:top-12 top-14 text-sm'>
                    <div className='flex flex-col cursor-pointer'>
                        {currentUser ? (
                            <>
                                <MenuItem
                                    onClick={() => { }}
                                    label='My trips'
                                />
                                <MenuItem
                                    onClick={() => { }}
                                    label='My favorites'
                                />
                                <MenuItem
                                    onClick={() => { }}
                                    label='My reservations'
                                />
                                <MenuItem
                                    onClick={() => { }}
                                    label='My properties'
                                />
                                <MenuItem
                                    onClick={() => { }}
                                    label='Gostays my stays'
                                />
                                <hr />
                                <MenuItem
                                    onClick={() => {
                                        signOut();
                                        toast.success('Successfully signed out')
                                    }}
                                    label='Sign out'
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={loginModal.onOpen}
                                    label='Sign in'
                                />
                                <MenuItem
                                    onClick={registerModal.onOpen}
                                    label='Sign up'
                                />
                            </>
                        )}

                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;