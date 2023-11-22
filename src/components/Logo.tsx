import Image from 'next/image';

export const Logo = () => {
  return (
    <div>
      <Image src="/logo.png" alt="Logo" width={50} height={50} />
    </div>
  );
};
