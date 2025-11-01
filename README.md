# Дипломная работа
https://danek682.github.io/Frontend-diplom/ **-ссылка на gh-pages**

В ходе выполнения дипломной работы для работы с API использовалась библиотека Axios.
## Пример:

```js
 useEffect(()=>{
        axios.get("https://shfe-diplom.neto-server.ru/alldata").then(response => {
            console.log(response.data)
            setResult(response.data.result)
        }).catch(err => (console.log(err)))
  },[]) 
}  
```

## Для модальных окон использовалась библиотека Modal
```js
import Modal  from "react-modal"
```

## Библиотека Moment использовалась для работы с временем вида "ЧЧ:ММ"
```js
import moment from "moment"
```

## Дипломная работа состоиз из компонентов и файлов:

### Гостевая часть:
 - **App.jsx** - вся маршрутизация по сайту и пропсы.
 - **SignIn** - Окно авторизации.
 - **ShowFilm** - Показ фильма и его конфигурации зала(пользователь).
 - **QrCode** - Блок с подтверждением бронированием билета и показа qr.
 - **Overview** - Начальная страница.
 - **ConfirmTickets** - Окно подтверждения выбора мест.

### Административная часть (AdministrationPanel):
- **AdministrationPanel.jsx** -  Основная часть административной панели, навигация, изменение конфигурации мест зала.
- **OpenSales** - Открытие продаж.
- **ConfigurePrice** - изменение цен за место.

#### ConfigureFilms:
  -**ConfigureFilms.jsx** - Добавление сеансов (Drag&Drop).
  -**ModalWindow.jsx** - Модальное окно добавления фильма.
  -**ModalWindowAddSeance.jsx** - Модальное окно добавления сеанса.
  -**ModalWindowDeleteSeance.jsx** - модальное окно удаления сеанса
  
## В процессе разработки:
- Адаптив для мобильных и планшетных версий
