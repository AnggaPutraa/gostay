'use client';

import { Range } from 'react-date-range';
import Calendar from '../inputs/Calendar';
import Button from '../Button';

interface ListingReservationProps {
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean
    disabledDate: Date[]
}

const ListingReservation = ({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDate
}: ListingReservationProps) => {
    return (
        <div className='bg-white rounded-xl border-[1px] border-neutral-400 overflow-hidden'>
            <div className='flex flex-row items-center gap-1 p-4'>
                <div className='text-2xl font-semibold'>
                    $ {price}
                </div>
                <div className='font-light text-neutral-600'>
                    night
                </div>
            </div>
            <hr />
            <Calendar
                value={dateRange}
                disabledDate={disabledDate}
                onChange={(value) => onChangeDate(value.selection)}
            />
            <hr />
            <div className='p-4'>
                <Button
                    label='Reserve'
                    onClick={onSubmit}
                    disabled={disabled}
                />
            </div>
            <div className='flex flex-row items-center justify-between p-4 font-semibold text-lg'>
                <div>
                    Total
                </div>
                <div>
                    $ {totalPrice}
                </div>
            </div>
        </div>
    );
}

export default ListingReservation;