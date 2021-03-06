import React from 'react';
import fig1_too_dense from './img/1-too-dense.png';
import fig2_almost_ok from './img/2-almost-ok.png';
import fig3_ok from './img/3-ok.png';
import fig4_too_sparse from './img/4-too-sparse.png';
import perPixel from './img/per-pixel.png';
import sparse from './img/sparse.png';
import simplification from './img/simplification.png';
import './intro.scss';

export default (slide) => [
  <div className="text-justify">
    <h3 className="display-3">Witaj!</h3>
    <p>
      Zapraszam serdecznie do wzięcia udziału w tej nietypowej, interaktywnej ankiecie, której celem jest
      zebranie subiektywnych opinii na temat rozwiązania pewnego problemu informatycznego.
    </p>
    <p>
      Ankieta jest nieodłączną częścią mojej <strong>pracy magisterskiej</strong>, zatytułowanej:
    </p>
    <blockquote>
      Przystosowanie webowych interfejsów użytkownika do wizualnej eksploracji wielkoskalowych danych
      pomiarowych.
    </blockquote>
    <p>
      Zalecam uważne zapoznanie się z materiałem wprowadzającym do zagadnienia oraz opisami poszczególnych wersji
      rozwiązania. Ankieta powinna zająć około 30 minut.
    </p>
    <p>
      <strong>Uwaga! Ta ankieta zbiera wszelkie informacje na temat Twojej aktywności na tej stronie w celach badawczych.
        Kontynuując, wyrażasz na to zgodę.
        </strong>
    </p>
    <p>
      W dodatku, proszę do tej ankiety użyć tylko przeglądarkę <strong>Chrome</strong>, ponieważ na pozostałych może działać niepoprawnie.
    </p>
  </div>,
  <div>
    <h3 className="display-3">
      Opis zagadnienia
    </h3>
    <p>
      Problem dotyczy płynnego, swobodnego i nieograniczonego przeglądania ogromnej ilości danych na wykresie liniowym z
      osią czasu.
    </p>
    <p>
      Ograniczenia i wyzwania można śmiało porównać do systemów mapowych. Dla przykładu, w systemie <em>Google
      Maps </em>
      odwiedzić możesz każde miejsce na ziemi. Za pomocą kilku intuicyjnych ruchów możesz oddalić się od pomnika Neptuna
      w Gdańsku, by zobaczyć całą mapę Świata, następnie przyjżeć się z bliska Liberty Island w Nowym Jorku. Wyzwaniem w
      takim systemie jest zapewnienie, aby użytkownik w ogóle nie musiał czekać na fragmenty map, które chce oglądać, bo
      przecież nikt nie ładuje z sieci Internet szczegółowych obrazów satelitarnych całej kuli ziemskiej.
    </p>
    <p>
      W przypadku danych pomiarowych, można powiedzieć, że problem jest nieco prostszy, ponieważ nie poruszamy się po
      przestrzeni dwuwymiarowej, ale tylko po wymiarze czasu, który układa się na poziomej osi wykresu.
      Niemniej jednak zapewnienie wysokiej rozdzielczości obrazu na wykresie stanowi wyzwanie, jeżeli chcemy, by
      użytkownik jak najrzadziej był zmuszony czekać na doładowanie potrzebnych danych.
      Według <a href="https://www.nngroup.com/articles/response-times-3-important-limits/" target="blank"> Nielsena</a>,
      oczekiwanie na odpowiedź systemu trwające powyżej 0.1 sekundy jest zauważalne i gdy się wydłuża &mdash; znacznie
      obniża się efektywność pracy.
    </p>
  </div>,
  <div className="text-justify">
    <h3 className="display-3">Wprowadzenie
      <small> merytoryczne</small>
    </h3>
    <p>
      Zagadnienie pochodzi z pogranicza czterech dziedzin:
    </p>
    <ul>
      <li><em>Wizualnej eksploracji danych</em>, bo chodzi o umożliwienie przeglądania wykresów serii
        czasowych, na przykład pomiaru stężenia dwutlenku siarki na urządzeniu pomiarowym lub parametrów pracy serca
        chorego pacjenta.
      </li>
      <li><em>Big Data</em>, ponieważ danych do eksploracji jest napawdę wiele. Na tyle dużo, że ich przetworzenie
        stanowi wyzwanie technologiczne i analityczne.
      </li>
      <li><em>Aplikacji internetowych</em>, ponieważ wykresy te mają być prezentowane w przeglądarce użytkownika, która
        łączy się ze zdalnym serwerem poprzez sieć komputerową.
      </li>
      <li><em>User Experience</em>, czyli aspektu użyteczności i efektywności korzystania z interfejsu interaktywnego.
      </li>
    </ul>

  </div>,
  <div className="text-justify">
    <h3 className="display-3">Przypadek użycia </h3>
    <p>
      Wyobraź sobie, że pracujesz nad analizą zjawisk pogodowych w ostatnich kilkudzesięciu latach.
      Chcesz w swojej przeglądarce internetowej przeglądać, w postaci wykresu liniowego, dane pięciu parametrów z
      urządzenia pomiarowego: wilgotności, tempertatury, prędkości wiatru, stężenia dwutlenku węgla i ozonu.
    </p>
    <p>
      Załóżmy, że z punktu widzenia badawczego zasadne jest, aby brać pod uwagę ostatnie pięćdziesiąt lat pomiarów
      wykonywanych z częstotliwością co 10 sekund.
      Dodatkowo załóżmy, że w analizie wartościowe jest zarówno przeglądanie większych zakresów danych by wysnuć
      generalne wnioski
      oraz przeglądanie poszczególnych incydentów.
    </p>
    <p>
      Policzmy, jak dużo danych potrzebnych jest do przetworzenia:
    </p>
    <pre>
        5 paramterów &times; 50 lat &times; 1/(10s) = 788.4 milionów punktów pomiarowych
    </pre>
    <p>
      Jeśli założyć, że każdy punkt wymaga zapisania daty powstania próbki oraz wartości pomiaru, to na zapisanie
      pojedynczego punktu potrzeba 12 bajtów (8 bajtów na datę w formacie <strong>long</strong> oraz 4 bajty na wartość
      w
      formacie
      zmiennoprzecinkowym).
    </p>
    <p>
      Biorąc pod uwagę liczbę punktów pomiarowych oraz rozmiar danych pojedynczego punktu,
      do przetworzenia jest aż <strong>9.5 GB danych</strong>
    </p>
    <p>
      Przy dobrym (100Mbps) łączu załadowanie tych danych do przeglądarki zajmie około <strong>13 minut</strong>.
      Nawet, jeśli każemy czekać użytkownikowi taki czas na pobranie tych danych z sieci do pamięci podręcznej
      komputera, to wyrysowanie miliarda punktów na wykresie niewątpliwie doprowadzi do awaryjnego zakończenia działania
      przeglądarki.
    </p>
  </div>,
  <div>
    <h3 className="display-3">Identyfikacja problemu</h3>
    <p>
      Być może zastanawiasz się, po co właściwie ładować te wszystkie dane? Przecież mózg ludzki nie jest w stanie
      przeanalizować każdego z miliarda punktów z osobna.
    </p>
    <p>
      Tutaj trzeba przywołać jeden istotny aspekt funkcjonalny zagadnienia.
      Otóż chcemy dać użytkownikowi swobodę nawigacji po wykresie, żeby mógł oglądać dane w
      dowolnym interesującym go zakresie i w odpowiednim przybliżeniu.
      To znaczy, że użytkownik powinien mieć dostęp do wszystkich danych.
      Nawigacja powinna odbywać się w sposób <strong>płynny i nieograniczony</strong>, tak jak to ma miejsce w
      nowoczesnych systemach mapowych.
    </p>
    <p>
      Faktycznie, ze wspomnianych wcześniej względów nie jest możliwe zbudowanie aplikacji, która pobiera wszystkie dane
      na początku,
      i je wszystkie potem wyświetla. Wykreślenie milionów punktów też zajmuje sporą część mocy obliczeniowej komputera
      użykownika. Takie rozwiązanie po prostu się nie nadaje do dużych zbiorów danych (nie skaluje się).
    </p>
  </div>,
  <div>
    <h3 className="display-3">Istniejące rozwiązania</h3>
    <p>
      Popularnym podejściem, które adresuje problem skalowalności, jest pobieranie z serwera tylko takiego zakresu
      danych, który ma być widoczny w danej chwili na ekranie, żeby uniknąć ładowania wszystkich danych.
    </p>
    <p>
      Nasuwa się pytanie, co w momencie, gdy użytkownik chciałby obejrzeć z grubsza jakiś duży zakres czasu? A może chciałby zobaczyć
      wszystkie dane "z lotu ptaka"?
      W tej sytuacji problem pojawia się z powrotem - potrzeba załadować wszystkie dane do przeglądarki.
    </p>
    <p>
      Warto zauważyć, że ze względu na pikselową konstrukcję monitorów graficznych, liczba punktów potrzebnych do
      poprawnego wyrysowania fragmentu danych ograniczona jest w pewnym sensie liczbą pikseli wyświetlacza. Zresztą -
      rozdzielczść ludzkiego oka też jest ograniczona.
      W związku z powyższym - użytkownik i tak jest w stanie tylko obejrzeć pewną uproszczoną formę danych, nie do końca
      nawet zdając sobie z tego sprawę dzięki zdolności abstrackcji i generalizacji.

    </p>
    <p>
      Dla przykładu, jeżeli na typowym monitorze chcemy obejrzeć nasze dane w zakresie jednego roku, to liczba punktów
      pomiarowych (około 3 miliony) znacznie przekracza liczbę pikseli w poziomie (około 2 tysiące).
      Zagęszczenie punktów na jednym rzędzie pikseli wyniesie kilka tysięcy.
      Takie zagęszczenie danych na ekranie jest zupełnie niepotrzebne, ze względu na wspomniane właśnie ograniczenia
      rozdzielczości
      monitora i ludzkiego oka.
    </p>
    <p>
      To naturalne ograniczenie wykorzystuje się w optymalizacji wspomnianego wcześniej problemu.
      Otóż zakłada się, że oprócz tego, że z serwera są pobierane tylko chwilowo potrzebne fragmenty danych, pobiera się je w
      formie maksymalnie uproszczonej. Nie za prostej, by nie było to zauważone przez ludzkie oko, ale takiej, by
      zminimalizować wielkość przesyłanych danych. Rozmiar ładowanych danych będzie więc związany z liczbą rzędów pikseli w
      poziomie &mdash; tym samym niezależny od wielkości zakresu czasu.
    </p>
    <p>
      Pozostaje jeszcze zadać sobie pytanie, czym właściwie jest to uproszczenie?
    </p>
  </div>,
  <div>
    <h3 className="display-3">Istniejące rozwiązania
      <small> &raquo; agregacje</small>
    </h3>
    <p>
      Uproszczona forma danych w naszym przypadku dotyczy tak na prawdę uproszczenia konkretnego piksela wyświetlanego
      wykresu.
      Przy dużym zagęszczeniu danych wiele punktów danych zostaje wyrysowanych na tym samym pionie piskeli, jak pokazano
      na rysunku poniżej.

    </p>
    <figure className="my-fig">
      <img src={simplification}/>
      <figcaption>
        Gdy na jeden piksel przypada dużo punktów do wyświetlenia (po lewej), to i tak monitor wyświetli to
        jako pionowy słupek obejmujący występujące w tym pikselu wartości (po prawej).
      </figcaption>
    </figure>
    <p>
      W związku z tym, uproszczoną formą danych będzie taka forma, która daje ten sam efekt na ekranie, ale będzie
      opisywała tylko taki pionowy "słupek" opisujący zakres wartości w danej kolumnie pikseli.
      W tym celu wprowadza się pojęcie <strong>agregacji danych</strong>.
    </p>
    <p>
      W tym przypadku agregacja to pewna struktura danych opisująca generalne cechy grupy danych z pewnego zakresu.
      Do obliczenia agregacji wykorzystuje się <em>agregaty</em> - funkcje matematyczne wyliczjące określoną statystykę.
      W tego typu systemach popularnymi agregatami są minimum, maksimum oraz wartość średnia.
    </p>
    <p>
      Przykład agregacji:
    </p>
    <blockquote>
      W sierpniu 2017 maksymalna temperatura wyniosła 33&deg;C, minimalna 15&deg;C, a średnia 21.34&deg;C.
    </blockquote>
    <p>
      Jest to zbiór, który w prosty i zwięzły sposób opisuje najważniejsze ogólne cechy zakresu pomiarów
      dokonanych w sierpniu 2017.
    </p>
    <p>
      Tego typu agregacja jest uproszczoną formą danych. Nie oznacza to, że może być wykorzystana w dowolnym momencie.
      Najlepiej ją wykorzystać dla takiej skali wykresu, gdzie będzie ona mieściła się na jednym pionie pikselów ekranu.
      Gdy będzie większa - uproszczenie będzie już zauważalne dla ludzkiego oka.
    </p>
    <p>
      Poniżej pokazano ten sam zakres danych, gdy zostały dobrane odpowiednie uproszczenia danych, oraz gdy zastosuje się
      zbyt duże uproszczenia. <strong>Uwaga</strong> - należy patrzeć na cieniowany obszar wykresu.
    </p>
    <figure className="my-fig">
      <img src={perPixel}/>
      <figcaption>przykład agregacji o dopasowanej długości, mniejszej niż piksel - nie widać uproszczenia</figcaption>
    </figure>
    <figure className="my-fig">
      <img src={sparse}/>
      <figcaption>przykład źle dobranej agregacji, większej niż jeden piksel - uproszczenie zauważalne dla ludzkiego oka
      </figcaption>
    </figure>
    <p>
      Podsumowując - popularne podejście umożliwia swobodną i nieograniczoną eksplorację wielkich zbiorów, ponieważ
      minimalizuje komunikację między przeglądarką a serwerem stosujac takie uproszczenia, by nie zmniejszało
      dokładności danych wyświetlanych na wykresie.
    </p>
  </div>,
  <div>
    <h3 className="display-3">Istniejące rozwiązania
      <small> &raquo; serwer danych</small>
    </h3>
    <p>
      Warunkiem koniecznym tego rozwiązania jest, aby serwer na każde żądanie mógł odpowiedzieć w bardzo krótkim czasie.
      W tym celu serwer musi obliczyć agregacje (formy uproszczone), zanim zostanie o nie poproszony, ponieważ
      obliczenie agregacji dla większych zakresów może trwać zbyt długo.
    </p>
    <p>
      Serwer danych trzyma w specjalnie przygotowanej bazie dane oryginalne (generowane co 10s) (tutaj 9.5GB) oraz
      wyliczone agregacje
      o różnych wielkościach, na przykład
      <em> 30s</em>,
      <em> 1m</em>,
      <em> 3m</em>,
      <em> 10m</em>,
      <em> 30m</em>,
      <em> 1h</em>,
      <em> 4h</em>,
      <em> 8h</em>,
      <em> 12h</em>,
      <em> 1d</em>,
      <em> 7d</em>,
      <em> 30d</em>,
      <em> 90d</em>,
      <em> 1y</em>
      .
    </p>
    <p>
      Ważne jest, by tak dobrać wielkości agregacji, by dla każdego możliwego przybliżenia (skali) wykresu można było
      żądać dane o takiej wielkości agregacji, by odpowiadały blisko, lecz nie więcej niż jednemu pionu pikselów.
      Gdyby tak nie było, trzeba by było żądać mniejszych agregacji, co spowoduje niepotrzebnie zbyt dużą gęstość danych
      do wyrysowania na ekranie.
      Z kolei jeśli agregacja nie zmieściła by się w jednym rzędzie pikseli, będzie to widoczne jako reprezentacja danych niskiej rozdzielczości.
    </p>
    <figure className="my-fig">
      <img src={fig1_too_dense} alt="missing"/>
      <figcaption>zbyt małe agregacje - niepotrzebnie zbyt wiele punktów zostanie wyrysowanych w jednym pikselu
      </figcaption>
    </figure>
    <figure className="my-fig">
      <img src={fig2_almost_ok} alt="missing"/>
      <figcaption>prawie dobrze, ale, wciąż dwa punkty przypadają na jeden piksel</figcaption>
    </figure>
    <figure className="my-fig">
      <img src={fig3_ok} alt="missing"/>
      <figcaption>te agregacje są odpowiednie, gdyż w każdym pikselu mieści się jeden punkt</figcaption>
    </figure>
    <figure className="my-fig">
      <img src={fig4_too_sparse} alt="missing"/>
      <figcaption>zbyt obszerne agregacje, nie wszystkie piskele zawierają punkt - niska rozdzielczość zostanie
        zauważona przez użytkownika
      </figcaption>
    </figure>
  </div>,
  <div>
    <h3 className="display-3">Istniejące rozwiązania
      <small> &raquo; wyzwania</small>
    </h3>
    <p>
      Można więc uznać, że takie rozwiązanie w stu procentach rozwiązuje problem płynnej i nieograniczonej ekploracji
      wielkoskalowych danych pomiarowych w przeglądarce internetowej.
      Niestety, nie wzięliśmy pod uwagę jednego &mdash; ważnego czynnika &mdash; obecności sieci komputerowej.
    </p>
    <p>
      Skoro fragmenty danych ładowane sa na żądanie użytkownika, to będzie on zmuszony oczekiwać na te dane, zanim
      zostaną dostarczone przez sieć z serwera do przeglądarki.
      Nie będzie on w stanie płynnie eksplorować danych.
      Warto wspomnieć, że wg
      <a href="https://www.nngroup.com/articles/response-times-3-important-limits/" target="blank"> Nielsena</a>,
      oczekiwanie na odpowiedź systemu trwające powyżej 0.1 sekundy jest zauważalne i gdy się wydłuża &mdash; znacznie
      obniża się efektywność korzystania z systemu.
    </p>
    <p>
      To właśnie efektywności wizualnej eksploracji danych poświęcona jest moja praca, w ramach której zaproponowałem
      rozwiązanie, którego kolejne ulepszone wersje zostaną poddane subiektywnej ocenie w tej ankiecie.
    </p>
  </div>,
  <div>
    <h3 className="display-3">Proponowane rozwiązanie </h3>
    <p>
      Rozwiązanie ma na celu sprawienie, by użytkownik eksplorując dane nie doświadczał negatywnych skutków opóźnień
      sieci, żeby możliwie najlepiej ukryć przed nim fakt, że dane, które przegląda, zlokalizowane są na
      odległym serwerze.
      Dzięki temu użytkownicy dokonujący analizy wizualnej danych będą mogli jeszcze efektywniej wykonywać swoją pracę i
      tym samym zwiększyć satysfakcję z użytkowania całego systemu.
    </p>
    <p>
      Rozwiązanie zostało zaprojektowane w postaci uniwersalnego modułu (biblioteki) działającego w przeglądarce
      (język <em>JavaScript</em>), który łatwo integruje się z istniejącymi aplikacjami przeglądarkowymi, napisanymi
      również w języku JavaScript.
    </p>
    <p>
      Biblioteka ta, nosząca nazwę <em>"ExploreJS"</em>, zbudowana jest na czterech filarach:
    </p>
    <ul>
      <li>pamięć podręczna agregacji,</li>
      <li>projekcja pamięci podręcznej,</li>
      <li>mechanizmy predykcji,</li>
      <li>optymalizacja zapytań.</li>
    </ul>
    <p>
      W ankiecie zostaniesz poproszony o eksplorację przykładowych danych prezentowanych na interaktywnym wykresie
      liniowym.
      Zostanie poddane ocenie pięć wersji rozwiązania. Pierwszym będzie tzw. rozwiązanie istniejące, później będą już
      rozwiązania ulepszone o kolejne filary.
      Twoim zadaniem będzie dokonać subiektywnej oceny satysfakcji użytkowania każdej wersji względem poprzedniej.
    </p>
  </div>
][slide]
