class Sample {
    #data;

    constructor(...args) {
      if (args.length === 1 && Array.isArray(args[0])) {
        this.#data = args[0].slice();
      } else {
        this.#data = args.slice();
      }
      this.created = new Date();
      Object.freeze(this); // защита от добавления новых свойств
    }

    getData() {
      return this.#data.slice();
    }

    getSeries() {
      return this.#data.slice().sort((a, b) => a - b);
    }

    getValues() {
      return Array.from(new Set(this.#data)).sort((a, b) => a - b);
    }

    getVariationSeries() {
      const freqMap = new Map();
      for (const val of this.#data) {
        freqMap.set(val, (freqMap.get(val) || 0) + 1);
      }
      // Создаём объект с отсортированными ключами
      return Object.fromEntries(
        Array.from(freqMap.entries()).sort((a, b) => a[0] - b[0])
      );
    }

    get volume() {
      return this.#data.length;
    }

    get minValue() {
      return Math.min(...this.#data);
    }

    get maxValue() {
      return Math.max(...this.#data);
    }

    get range() {
      return this.maxValue - this.minValue;
    }

    get mean() {
      if (this.volume === 0) return NaN;
      return this.#data.reduce((sum, v) => sum + v, 0) / this.volume;
    }

    get mode() {
      if (this.volume === 0) return undefined;
      const freqMap = {};
      let maxFreq = 0;
      let modes = [];
      for (const val of this.#data) {
        freqMap[val] = (freqMap[val] || 0) + 1;
        if (freqMap[val] > maxFreq) {
          maxFreq = freqMap[val];
        }
      }
      for (const val in freqMap) {
        if (freqMap[val] === maxFreq) {
          modes.push(Number(val));
        }
      }
      if (modes.length === Object.keys(freqMap).length) {
        // Все значения встречаются одинаково — нет моды
        return undefined;
      }
      return modes.length === 1 ? modes[0] : modes.sort((a, b) => a - b);
    }

    get median() {
      if (this.volume === 0) return NaN;
      const sorted = this.getSeries();
      const mid = Math.floor(this.volume / 2);
      if (this.volume % 2 === 0) {
        return (sorted[mid - 1] + sorted[mid]) / 2;
      } else {
        return sorted[mid];
      }
    }

    get variance() {
      // => CalculationError
      if (this.volume < 2) return NaN;
      const m = this.mean;
      const sumSqDiff = this.#data.reduce((sum, val) => sum + (val - m) ** 2, 0);
      return sumSqDiff / (this.volume - 1);
    }

    get std() {
      // => IntermediateCalculationError
      const v = this.variance;
      return isNaN(v) ? NaN : Math.sqrt(v);
    }

    get cv() {
      // => CalculationError
      const mean = this.mean;
      return mean === 0 ? NaN : this.std / mean;
    }

    get isNormal() {
      // Правило трёх сигм: не более ~0.27% значений вне [mean - 3*std, mean + 3*std]
      if (this.volume === 0) return false;
      const mean = this.mean,
        std = this.std;
      if (isNaN(std) || std === 0) return false;
      const lower = mean - 3 * std,
        upper = mean + 3 * std;
      const countOutside = this.#data.filter(v => v < lower || v > upper).length;
      return countOutside <= this.volume * 0.0027;
    }

    get isSymmetric() {
      // Используем асимметрию: сравним среднее и медиану
      if (this.volume === 0) return false;
      const mean = this.mean,
        median = this.median;
      if (isNaN(mean) || isNaN(median)) return false;
      // Если среднее и медиана близки в пределах 1% от диапазона
      const tolerance = 0.01 * this.range;
      return Math.abs(mean - median) <= tolerance;
    }

    get uniformity() {
      if (this.volume === 0) return undefined;
      // Критерий: коэффициент вариации cv
      // <0.1 - "low"; 0.1–0.3 - "medium"; 0.3–0.6 - "heigh"; >0.6 - "extreme"
      const cv = this.cv;
      if (isNaN(cv)) return undefined;
      if (cv < 0.1) return "low";
      if (cv < 0.3) return "medium";
      if (cv < 0.6) return "heigh";
      return "extreme";
    }
  }
