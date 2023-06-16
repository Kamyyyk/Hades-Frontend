export const dictionary = {
   common: {
      add: 'Dodaj',
      edit: 'Edytuj',
      delete: 'Usuń',
      funeralHouseTitle: 'Dom pogrzebowy one way ticket',
      confirmDeleteMessage: 'Czy na pewno chcesz usunąc tę pozycję?',
      login: 'Logowanie',
      funeralDetails: 'Szczegóły pogrzebu',
      name: 'Imię:',
      surname: 'Nazwisko:',
      funeralDate: 'Data pogrzebu:',
      deathDate: 'Data śmierci:',
      containerType: 'Typ pojemnika:',
      funeralPrice: 'Cena za pogrzeb:',
      cemeteryName: 'Nazwa cmentarza:',
      cemeteryAddress: 'Adres cmentarza:',
      funeralTotalPrice: 'Cena za pogrzeb',
      cemetery: 'Cmentarz',
      nameAndSurname: 'Imię i nazwisko',
      pln: 'PLN:',
      actions: 'Akcje',
      view: 'Wyświetl',
      createFuneralRaport: 'Utwórz raport',
      downloadReport: 'Pobierz raport pogrzebu',
      submit: 'Wyślij',
      descriptionTag: 'Plakietka z opisem'
   },
   form: {
      name: 'Imię',
      documentationNumber: 'Numer dokumentu',
      surname: 'Nazwisko',
      username: 'Nazwa użytkownika',
      roleType: 'Rola',
      password: 'Hasło',
      dateArrived: 'Data przybycia',
      sex: 'Płeć',
      birthDate: 'Data urodzenia',
      deathDate: 'Data śmierci',
      licenceNumber: 'Numer rejestracyjny',
      brand: 'Marka',
      model: 'Model',
      driver: 'Kierowca',
      cemeteryName: 'Nazwa cmentarza',
      address: 'Adres',
      morgue: 'Chłodnia',
      deceased: 'Zmarły',
      containerName: 'Nazwa pokrowca',
      containerType: 'Typ pokrowca',
      funeralDate: 'Data pogrzebu',
      status: 'Status',
      price: 'Cena pogrzebu',
      placeOnCemetery: 'Miejsce na cmentarzu',
      container: 'Opakowanie',
      shipping: 'Transport',
      funeralType: 'Typ pogrzebu',
      shippingName: 'Nazwa transportu',
      selectDriver: 'Wybór kierowcy',
      addDescriptionTag: 'Dodaj plakietkę z opisem',
      error: {
         fieldRequired: 'Pole wymagane'
      },
      validation: {
         deathDateIsAfterArrive: 'Data przyjazdu nie może wystapić przed śmiercią',
         deathDateIsBeforeBornDate: 'Data śmierci nie może wystąpić przed datą urodzenia'
      }
   },
   funeralHouseWorker: {
      caravanTable: {
         caravanList: 'Lista karawanów',
         addNewCaravan: 'Dodaj nowy karawan',
         editCaravan: 'Edytuj karawan',
         addSuccess: 'Pomyślnie dodano karawan',
         editSuccess: 'Pomyślnie edytowano karawan',
         deleteSuccess: 'Pomyślnioe usunięto karawan'
      },
      cemeteryPlaceTable: {
         cemeteryPlaceList: 'Lista miejsc na cmentarzu',
         addNewCemeteryPlace: 'Dodaj nowe miejsce na cmentarzu',
         editCemeteryPlace: 'Edytuj miejsce na cmentarzu',
         addSuccess: 'Pomyślnie dodano miejsce na cmentarzu',
         editSuccess: 'Pomyślnie edytowano miejsce na cmentarzu',
         deleteSuccess: 'Pomyślnie usunięto miejsce na cmentarzu'
      },
      deceasedDocumentationTable: {
         deceasedDocumentationList: 'Dokumentacja zmarłych',
         addNewDeceasedDocumentation: 'Dodaj nową dokumentację zmarłego',
         editDeceasedDocumentation: 'Edytuj dokumentację zmarłego',
         addSuccess: 'Pomyślnie dodano dokumentację zmarłego',
         editSuccess: 'Pomyślnie edytowano dokumentacje zmarłego',
         deleteSuccess: 'Pomyślnie usunięto dokumentację zmarłego'
      },
      funeralItemsTable: {
         funeralItemsList: 'Lista pojemników',
         addNewFuneralItem: 'Dodaj nowy pojemnik',
         editFuneralItem: 'Edytuj pojemnik',
         addSuccess: 'Pomyślnie dodano pojemnik',
         editSuccess: 'Pomyślnie edytowano pojemnik',
         deleteSuccess: 'Pomyślnie usunięto pojemnik',
         options: {
            containerType: {
               urn: 'Urna',
               coffin: 'Trumna'
            }
         }
      },
      funeralTable: {
         funeralList: 'Lista pogrzebów',
         editFuneral: 'Edytuj pogrzeb',
         editSuccess: 'Pomyślnie edytowano pogrzeb',
         deleteSuccess: 'Pomyślnie usunięto pogrzeb'
      },
      prepareFuneral: {
         prepareFuneralTitle: 'Przygotowanie pogrzebu',
         funeralList: 'Lista pogrzebów',
         viewAddedFuneral: 'Wyświetl dodany pogrzeb',
         addSuccess: 'Pomyślnie przygotowano pogrzeb',
         prepareAnotherFuneral: 'Przygotuj kolejny pogrzeb',
         options: {
            funeralStatus: {
               open: 'Nowy',
               finished: 'Zakończony',
               inProgress: 'W trakcie'
            },
            funeralType: {
               secular: 'Świecki',
               catholic: 'Chrześcijański'
            }
         }
      },
      shippingTable: {
         shippingList: 'Lista transportów',
         addNewShipping: 'Dodaj nowy transport',
         editShipping: 'Edytuj transport',
         addSuccess: 'Pomyślnie dodano transport',
         editSuccess: 'Pomyślnie edytowano transport',
         deleteSuccess: 'Pomyślnie usunięto transport'
      },
   },
   administrator: {
      driverTable: {
         driverList: 'Lista kierowców',
         addNewDriver: 'Dodaj nowego kierowcę',
         editDriver: 'Edytuj kierowcę',
         addSuccess: 'Pomyślnie dodano kierowcę',
         editSuccess: 'Pomyślnie edytowano kierowcę',
         deleteSuccess: 'Pomyślnie usunięto kierowcę'
      },
      userTable: {
         userList: 'Lista użytkowników',
         addNewUser: 'Dodaj nowego użytkownika',
         editUser: 'Edytuj użytkownika',
         addSuccess: 'Pomyślnie dodano użytkownika',
         editSuccess: 'Pomyślnie edytowano użytkownika',
         deleteSuccess: 'Pomyślnie usunięto użytkownika'
      }
   },
   morgueWorker: {
      deceasedTable: {
         deceasedList: 'Lista zmarłych',
         addNewDeceased: 'Dodaj zmarłego',
         editDeceased: 'Edytuj zmarłego',
         addSuccess: 'Pomyślnie dodano zmarłego',
         editSuccess: 'Pomyślnie edytowano zmarłego',
         deleteSuccess: 'Pomyślnie usunięto zmarłego'
      }

   },
   auth: {
      success: 'Zalogowano pomyślnie',
      error: 'Nie znaleziono użytkownika',
      logout: 'Wyloguj się',
      password: 'Hasło'
   },
   pageError: {
      error: 'Błąd na stronie'
   },
   menu: {
      funeralHouseWorker: 'Pracownik domu pogrzebowego',
      morgueWorker: 'Pracowik chłodni',
      administrator: 'Administrator',
      caravans: 'Karawany',
      cemetery: 'Miejsca na cmentarzu',
      funeralItems: 'Pojemniki',
      shipping: 'Transport',
      documentation: 'Dokumentacja zmarłego',
      prepareFuneral: 'Przygotowanie pogrzebu',
      funeralList: 'Lista pogrzebów',
      morgue: 'Chłodnia',
      drivers: 'Kierowcy',
      users: 'Użytkownicy',
      showMenu: 'Wyświetl menu'
   }
};



// export const dictionary = {
//    common: {
//       edit: 'Edit',
//       delete: 'Delete',
//       funeralHouseTitle: 'Funeral house one way ticket',
//       confirmDeleteMessage: 'Are you sure you want to delete this position?',
//       login: 'login',
//       funeralDetails: 'Funeral details',
//       name: 'Name:',
//       surname: 'Surname:',
//       funeralDate: 'Funeral date:',
//       deathDate: 'Death date:',
//       containerType: 'Container type:',
//       funeralPrice: 'Funeral price:',
//       cemeteryName: 'Cemetery name:',
//       cemeteryAddress: 'Cemetery address',
//       navigateToTable: 'Go to table view'
//    },
//    form: {
//       name: 'Name',
//       documentationNumber: 'Documentation number',
//       surname: 'Surname',
//       username: 'Username',
//       roleType: 'Role type',
//       password: 'Password',
//       dateArrived: 'Date arrived',
//       sex: 'Sex',
//       birthDate: 'Birth date',
//       deathDate: 'Death date',
//       licenceNumber: 'Licence number',
//       brand: 'Brand',
//       model: 'Model',
//       driver: 'Driver',
//       cemeteryName: 'Cemetery name',
//       address: 'Address',
//       morgue: 'Morgue',
//       deceased: 'Deceased',
//       containerName: 'Funeral item Name',
//       containerType: 'Funeral item Type',
//       funeralDate: 'Funeral date',
//       status: 'Funeral status',
//       price: 'Funeral price',
//       placeOnCemetery: 'Place on cemetery',
//       container: 'Container',
//       shipping: 'Shipping',
//       funeralType: 'Funeral type',
//       shippingName: 'Shipping name',
//       selectDriver: 'Select driver'
//    },
//    funeralHouseWorker: {
//       caravanTable: {
//          caravanList: 'Caravan List',
//          addNewCaravan: 'Add new caravan',
//          editCaravan: 'Edit caravan',
//          addSuccess: 'Successfully added caravan',
//          editSuccess: 'Successfully edited caravan',
//          deleteSuccess: 'Successfully deleted caravan'
//       },
//       cemeteryPlaceTable: {
//          cemeteryPlaceList: 'Cemetery place List',
//          addNewCemeteryPlace: 'Add new cemetery place',
//          editCemeteryPlace: 'Edit cemetery place',
//          addSuccess: 'Successfully added cemetery place',
//          editSuccess: 'Successfully edited cemetery place',
//          deleteSuccess: 'Successfully deleted cemetery place'
//       },
//       deceasedDocumentationTable: {
//          deceasedDocumentationList: 'Deceased documentation List',
//          addNewDeceasedDocumentation: 'Add new deceased documentation',
//          editDeceasedDocumentation: 'Edit deceased documentation',
//          addSuccess: 'Successfully added deceased documentation',
//          editSuccess: 'Successfully edited deceased documentation',
//          deleteSuccess: 'Successfully deleted deceased documentation'
//       },
//       funeralItemsTable: {
//          funeralItemsList: 'Funeral items List',
//          addNewFuneralItem: 'Add new funeral item',
//          editFuneralItem: 'Edit funeral item',
//          addSuccess: 'Successfully added funeral item',
//          editSuccess: 'Successfully edited funeral item',
//          deleteSuccess: 'Successfully deleted funeral item'
//       },
//       funeralTable: {
//          funeralList: 'Funeral List',
//          editFuneral: 'Edit funeral',
//          editSuccess: 'Successfully edited funeral',
//          deleteSuccess: 'Successfully deleted funeral'
//       },
//       prepareFuneral: {
//          prepareFuneralTitle: 'Prepare funeral',
//          funeralList: 'Funeral List',
//          viewAddedFuneral: 'View added funeral',
//          addSuccess: 'Successfully prepared funeral',
//          prepareAnotherFuneral: 'Prepare another funeral'
//       },
//       shippingTable: {
//          shippingList: 'Shipping List',
//          addNewShipping: 'Add new shipping',
//          editShipping: 'Edit shipping',
//          addSuccess: 'Successfully added shipping',
//          editSuccess: 'Successfully edited shipping',
//          deleteSuccess: 'Successfully deleted shipping'
//       },
//    },
//    administrator: {
//       driverTable: {
//          driverList: 'Drivers List',
//          addNewDriver: 'Add new driver',
//          editDriver: 'Edit driver',
//          addSuccess: 'Successfully added driver',
//          editSuccess: 'Successfully edited driver',
//          deleteSuccess: 'Successfully deleted driver'
//       },
//       userTable: {
//          userList: 'Users List',
//          addNewUser: 'Add new user',
//          editUser: 'Edit user',
//          addSuccess: 'Successfully added user',
//          editSuccess: 'Successfully edited user',
//          deleteSuccess: 'Successfully deleted user'
//       }
//    },
//    morgueWorker: {
//       deceasedTable: {
//          deceasedList: 'deceased List',
//          addNewDeceased: 'Add new deceased',
//          editDeceased: 'Edit deceased',
//          addSuccess: 'Successfully added deceased',
//          editSuccess: 'Successfully edited deceased',
//          deleteSuccess: 'Successfully deleted deceased'
//       }
//
//    },
//    auth: {
//       success: 'Logged successfully',
//       error: 'User not found'
//    },
//    pageError: {
//       error: 'Error on page'
//    }
// };