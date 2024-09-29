import {useState} from 'react';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import {ToggleGroup, ToggleGroupItem} from '@/components/ui/toggle-group';
import {ChevronLeft, ChevronRight} from 'lucide-react';

import {Button} from '@/components/ui/button';

import mastercard from '@/assets/Mastercard.png';
import visa from '@/assets/Visa_Brandmark_Blue_RGB.png';
import blik from '@/assets/BLIK-LOGO-RGB.png';
import {Input} from '@/components/ui/input';

const TokenManagement = () => {
  const [amount, setAmount] = useState(5);
  const numberOfTokens = 27;
  return (
    <div className="w-full m-5 border rounded">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-center text-4xl pt-2">Zarządzaj żetonami</h1>
        <hr />
        <div className="grid w-3/5 h-1/4 text-center border mt-10 rounded text-[#16a34a] border-[#16a34a]">
          <div className="text-2xl p-5">Dostępne żetony: {numberOfTokens}</div>
        </div>
        <Drawer>
          <DrawerTrigger className="mt-4 mb-0 bg-[#16a34a] px-16 py-4 rounded-full">Kup żetony</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="flex w-full justify-center text-xl ">Wybierz sposób płatności:</DrawerTitle>
            </DrawerHeader>
            <ToggleGroup variant="outline" type="single" className="flex justify-center mt-2">
              <ToggleGroupItem value="mastercard" className="py-2 px-4 text-lg flex flex-col items-center justify-center h-20 w-1/5">
                <img src={mastercard} alt="Mastercard Logo" className="h-8" /> <div>Mastercard</div>
              </ToggleGroupItem>
              <ToggleGroupItem value="visa" className="py-2 px-4 text-lg flex flex-col items-center justify-center h-20 w-1/5">
                <img src={visa} alt="Visa Logo" className="h-8" /> <div>Visa</div>
              </ToggleGroupItem>
              <ToggleGroupItem value="blik" className="py-2 px-4 text-lg flex  flex-col items-center justify-center h-20 w-1/5">
                <img src={blik} alt="BLIK Logo" className="h-8" /> <div>Blik</div>
              </ToggleGroupItem>
            </ToggleGroup>
            <div className="flex w-full justify-center mt-5 ">
              <h2>wybierz ile żetonów chcesz zakupić</h2>
            </div>
            <div className="flex w-full justify-center ">
              <Button
                className="rounded-r-none"
                onClick={() => {
                  amount !== 1 ? setAmount(amount - 1) : setAmount(amount);
                }}
              >
                <ChevronLeft />
              </Button>
              <Input
                className="w-16 rounded-none"
                value={amount}
                onChange={e => {
                  if (Number(e.target.value) > 99) {
                    setAmount(99);
                  } else if (Number(e.target.value) < 1) {
                    setAmount(1);
                  }
                }}
              />
              <Button
                className="rounded-l-none"
                onClick={() => {
                  amount < 99 ? setAmount(amount + 1) : setAmount(amount);
                }}
              >
                <ChevronRight />
              </Button>
            </div>
            <DrawerFooter className="flex justify-between mt-4">
              <Button>Zapłać</Button>
              <DrawerClose>
                <Button variant="outline">Anuluj</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default TokenManagement;
