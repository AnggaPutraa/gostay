'use client';

interface ContainerProps {
    children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
    return (
        <div className="max-w-[250px] xl:px-20 lg:px-10 sm:px-2 px-4">
            {children}
        </div>
    );
}

export default Container;