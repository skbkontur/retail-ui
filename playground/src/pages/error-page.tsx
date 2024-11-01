import { FC } from 'react';
import { ErrorPage, ErrorUnknownSvg } from '@skbkontur/react-error-pages';
import { KonturColors } from '@skbkontur/colors';
import { ArrowALeftIcon } from '@skbkontur/icons/icons/ArrowALeftIcon';
import { CommentRectTextIcon32Regular } from '@skbkontur/icons/icons/CommentRectTextIcon/CommentRectTextIcon32Regular';
import '@skbkontur/react-error-pages/styles.css';
import { useNavigate } from 'react-router-dom';

export const ErrorPages: FC = () => {
  const navigate = useNavigate();

  return (
    <ErrorPage>
      <ErrorPage.Logo href="/" src="https://s.kontur.ru/common-v2/logos/logo-product-28.svg" alt="Логотип" />
      <ErrorPage.Content illustration={<ErrorUnknownSvg color={KonturColors.redBasic60} />}>
        <ErrorPage.Title>Неизвестная ошибка</ErrorPage.Title>
        <ErrorPage.Description>
          <p>Страница была удалена или ее адрес поменялся. Проверьте адрес или вернитесь на главную страницу.</p>
          <p>Обновите страницу через несколько минут. Если проблема не решится, обратитесь в&nbsp;техподдержку.</p>
        </ErrorPage.Description>
      </ErrorPage.Content>
      <ErrorPage.Buttons>
        <ErrorPage.Button icon={<ArrowALeftIcon size={24} />} onClick={() => navigate('/')}>
          На страницу входа
        </ErrorPage.Button>
        <ErrorPage.Button icon={<CommentRectTextIcon32Regular size={24} />} id="support-button">
          Написать в техподдержку
        </ErrorPage.Button>
      </ErrorPage.Buttons>
    </ErrorPage>
  );
};
