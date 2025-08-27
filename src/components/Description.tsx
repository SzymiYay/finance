import styles from './Description.module.css'
import Dropdown from './Dropdown'

export default function Description() {
  return (
    <>
      <section className={styles.container}>
        <h2 className={styles.title}>Strategia GEM (Global Equity Momentum)</h2>

        <p>
          Strategia{' '}
          <a
            href="https://akademia.atlasetf.pl/gem-prosta-strategia-kupowania-etf-ow-w-trendzie/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Global Equity Momentum (GEM)</strong>
          </a>{' '}
          została opisana przez Gary’ego Antonacciego i opiera się na prostym
          założeniu: inwestujemy w aktywa, które w ostatnich 12 miesiącach
          (minus jeden miesiąc) wykazały najlepsze momentum. GEM ma szansę
          osiągać lepsze wyniki od szerokiego rynku, bo wychodzi z rynku akcji
          podczas najgorszych obsunięć, a jednocześnie maksymalnie wykorzystuje
          najlepsze okresy
        </p>
        <p>
          W praktyce oznacza to rotowanie między{' '}
          <strong>IWDA (rynki rozwinięte)</strong> i{' '}
          <strong>EIMI (rynki rozwijające się)</strong>, a gdy momentum na
          akcjach jest słabe – przechodzimy do <strong>CBU0</strong> lub{' '}
          <strong>IBO1</strong>. <strong>CSPX</strong> i <strong>CNDX</strong>{' '}
          mogą być dodatkowymi narzędziami do przeważania USA lub sektora
          technologicznego, jeśli inwestor chce bardziej aktywnie zarządzać
          portfelem.
        </p>
        <h3>Podstawowe zasady:</h3>
        <div>
          <ul>
            <li>
              Obliczamy 12-miesięczne momentum dla wybranych ETF-ów, np. robiąc
              rebalansing 1.08.2025 - stosujemy okienko 1.07.2024 - 30.06.2025
            </li>
            <li>Wybieramy aktywa z najwyższym momentum.</li>
            <li>
              Portfel aktualizujemy co miesiąc. W czystej wersji GEM sprzedaje
              się cały portfel i kupuje nowy ETF zgodnie z sygnałem, ale mozna
              dokupywać tylko nowe wpłaty według wskazań GEM, żeby ograniczyć
              koszty i podatki.
            </li>
          </ul>
        </div>

        <p>
          Dzięki temu strategia stara się <em>unikać długich bess</em> i{' '}
          <em>łapać trendy wzrostowe</em>.
        </p>

        <h3>Opis ETF:</h3>
        <div>
          <Dropdown title="EIMI.L – iShares MSCI Emerging Markets IMI">
            Ekspozycja na <em>rynki rozwijające się</em> (Chiny, Indie,
            Brazylia, Tajwan). W strategii GEM pełni rolę alternatywy dla rynków
            rozwiniętych, gdy momentum sprzyja EM.
            <br />
            <br />
            <a
              href="https://atlasetf.pl/etf-details/IE00BKM4GZ66/preview"
              target="_blank"
              rel="noopener noreferrer"
            >
              Przeczytaj więcej
            </a>
          </Dropdown>

          <Dropdown title="IWDA.L – iShares MSCI World">
            Szeroki indeks <em>rynki rozwinięte</em> (USA, Europa, Japonia,
            Kanada). To główny filar akcyjny w GEM – jeśli rynki rozwinięte mają
            przewagę momentum, wybieramy IWDA.
            <br />
            <br />
            <a
              href="https://atlasetf.pl/etf-details/US4642863926/preview"
              target="_blank"
              rel="noopener noreferrer"
            >
              Przeczytaj więcej
            </a>
          </Dropdown>

          <Dropdown title="CSPX.L – iShares Core S&P 500 UCITS ETF (Acc)">
            Ekspozycja na <em>S&P 500</em>, czyli 500 największych spółek w USA.
            ETF akumulujący (dywidendy reinwestowane). Może być używany jako
            przeważenie USA.
            <br />
            <br />
            <a
              href="https://atlasetf.pl/etf-details/IE00B5BMR087"
              target="_blank"
              rel="noopener noreferrer"
            >
              Przeczytaj więcej
            </a>
          </Dropdown>

          <Dropdown title="CNDX.L – iShares NASDAQ 100 UCITS ETF">
            Indeks <em>NASDAQ 100</em>, skoncentrowany na spółkach
            technologicznych (Apple, Microsoft, Nvidia, Meta). Bardziej zmienny
            niż CSPX, ale daje ekspozycję na innowacyjne sektory.
            <br />
            <br />
            <a
              href="https://atlasetf.pl/etf-details/IE00B53SZB19"
              target="_blank"
              rel="noopener noreferrer"
            >
              Przeczytaj więcej
            </a>
          </Dropdown>

          <Dropdown title="CBU0.L – iShares $ Treasury Bond 7-10yr UCITS ETF">
            Obligacje skarbowe USA o średnim terminie zapadalności (7–10 lat). W
            strategii GEM pełnią rolę <em>bezpiecznej przystani</em>, gdy
            momentum na rynkach akcji jest negatywne.
            <br />
            <br />
            <a
              href="https://atlasetf.pl/etf-details/IE00BYVQ9G36"
              target="_blank"
              rel="noopener noreferrer"
            >
              Przeczytaj więcej
            </a>
          </Dropdown>

          <Dropdown title="IB01.L – iShares $ Treasury Bond 0-1yr UCITS ETF">
            Krótkoterminowe obligacje USA (0–1 rok). Bardzo niskie ryzyko i mała
            zmienność – traktowane jako <em>gotówka</em>. Używane w GEM jako
            najbezpieczniejsza część aktywów.
            <br />
            <br />
            <a
              href="https://atlasetf.pl/etf-details/IE00BGSF1X88"
              target="_blank"
              rel="noopener noreferrer"
            >
              Przeczytaj więcej
            </a>
          </Dropdown>
        </div>
      </section>
    </>
  )
}
