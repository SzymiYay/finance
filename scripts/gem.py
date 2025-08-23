import yfinance as yf
import pandas as pd
from datetime import date, timedelta
from dateutil.relativedelta import relativedelta

# --- Funkcje pomocnicze ---
def last_business_day(d: date) -> date:
    return pd.bdate_range(end=pd.Timestamp(d), periods=1)[0].date()

def first_business_day(d: date) -> date:
    return pd.bdate_range(start=pd.Timestamp(d), periods=1)[0].date()

# --- Tickery ---
tickers = ["IWDA.L", "IB01.L", "CSPX.L", "CBU0.L", "CNDX.L", "EIMI.L"]

today = date.today()
first_of_month = today.replace(day=1)

end_ref = first_of_month - relativedelta(months=1) - timedelta(days=1)
end_date = last_business_day(end_ref)

start_ref = first_of_month - relativedelta(months=13)
start_ref = start_ref + timedelta(days=1)
start_date = first_business_day(start_ref)

print(f"Momentum window: {start_date} → {end_date}")

# --- Pobieranie danych ---
data = yf.download(
    tickers,
    start=start_date - timedelta(days=5),
    end=end_date + timedelta(days=1),
    auto_adjust=True,
    progress=False
)["Close"]

# --- Wyniki końcowe (12M momentum) ---
results = []
for t in tickers:
    s = data[t].dropna()
    if s.empty:
        continue
    try:
        p0 = s.loc[:pd.Timestamp(start_date)].iloc[-1]
        p1 = s.loc[:pd.Timestamp(end_date)].iloc[-1]
    except IndexError:
        continue
    mom = (p1 / p0 - 1) * 100
    results.append((t, round(mom, 2)))

df = pd.DataFrame(results, columns=["ETF", "12M Momentum (%)"])
df = df.sort_values("12M Momentum (%)", ascending=False).reset_index(drop=True)

df.to_json("public/data/results.json", orient="records", indent=2)

# --- Momentum w czasie ---
momentum_data = pd.DataFrame()
for t in tickers:
    s = data[t].dropna()
    if s.empty:
        continue
    try:
        p0 = s.loc[:pd.Timestamp(start_date)].iloc[-1]
    except IndexError:
        continue
    momentum_data[t] = (s / p0 - 1) * 100

momentum_data.to_json("public/data/history.json", orient="split", date_format="iso")

print("✅ Pliki results.json i history.json zostały zaktualizowane.")