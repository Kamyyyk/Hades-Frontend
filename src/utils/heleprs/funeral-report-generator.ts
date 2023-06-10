import {IFuneralResponse} from '@src/app/libs/types/reponses/funeral-response';
import {countAge, stringToDate} from '@src/utils/heleprs/count-age';
import {numberToDecimal} from '@src/utils/heleprs/number-to-decimal';
import {orderNumberGenerator} from '@src/utils/heleprs/order-number-generator';
import jsPDF from 'jspdf';

export const FuneralReportGenerator = (data: IFuneralResponse ) => {
   const report = new jsPDF();
   const orderNumber = orderNumberGenerator();


   const birthDate = stringToDate(data?.morgue?.birthDate);
   const deathDate = stringToDate(data?.morgue?.deathDate);
   const age = countAge(birthDate, deathDate);

   report.text('Raport z zlecenia organizacji pochowku', 10, 30);
   report.text(`Nr zlecenia: ${orderNumber}`, 140, 20);
   report.text('Dane zmarlego:', 10, 50);
   report.text(`Nazwisko i imie: ${data?.morgue.name} ${data?.morgue.surname}`, 10, 60);
   report.text(`Wiek: ${age} lat`,10, 70);
   report.text(`Data zgonu: ${data?.morgue.deathDate}`, 10, 80);
   report.text(`Wybrany pojemnik do pochówku:  ${data?.container.containerType === 'URN' ? 'Urna' : 'Trumna'} ${data?.container.containerName}`, 10, 90);
   report.text(`Rodzaj pochówku: ${data?.funeralType === 'SECULAR' ? 'Swiecki' : 'Katolicki'}`, 10, 100);
   report.text('Cmentarz:', 10, 110);
   report.text(`${data?.placeOnCemetery.cemeteryName}, ${data?.placeOnCemetery.address}`, 10, 120);
   report.text(`Data pogrzebu: ${data.funeralDate}`, 10, 130);
   report.text(`Cena koncowa do zaplaty: ${numberToDecimal(data?.price)} PLN`, 10, 160);
   report.text('Podpis zleceniodawcy', 140, 200);
   report.text('...................................', 140, 215);

   report.save(`${orderNumber}.pdf`);

   return report;
};