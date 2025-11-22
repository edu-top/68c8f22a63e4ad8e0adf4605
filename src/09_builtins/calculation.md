
Основные характеристики выборки:

- объем выборочной совокупности (`volume`) $n$ — количество элементов выборки

- минимальное (`minValue`) и максимальное (`maxValue`) занчения — $x_{min}$ и $x_{max}$ соответственно

- размах вариации (`range`):

  $$ R = x_{\max} - x_{\min} $$

- мода (`volume`) $m_o$ — значение, которое наблюдается в выборке чаще всего

- медиана (`median`) $m_e$ — это значение признака, которое делит упорядоченное распределение на две равные по количеству частей

- выборочное среднее (`mean`)

  $$ \bar{x} = \frac{x_1 + x_2 + \dots + x_n}{n} = \frac{1}{n} \sum_{i=1}^n{x_i} $$

- выборочная дисперсия (`variance`)

  $$ S^2 = \frac{1}{n−1} \sum_{i=1}^n{(x_i-\bar{x})^2} $$

- среднее квадратическое отклонение выборки (`std`)

  $$ S_P = \sqrt{S^2} $$

- коэффициент вариации (`cv`):

  $$ c_v = \frac{S}{|\bar{x}|} $$

Обобщенные характеристики выборки:

- распределение считается нормальным, если 99,72% значений лежит в интервале

  $$ (\bar{x}−3S; \bar{x}+3S) $$

- распределение считается симметричным, если выполняется следующее соотношение

  $$ \vert \bar{x} - m_e \vert \le \frac{3 S}{\sqrt{n}} $$

Критерии оценки степени вариативности по коэффициенту вариации:
- $cv < 10\%$ — низкая вариативность (высокая однородность признака);

- $10\% ≤ cv ≤ 20\%$ — средняя вариативность (средняя однородности);

- $cv > 20\%$ — высокая вариативность (низкая однородность);

- $cv > 40\%$ — очень высокая вариативность, признак сильно изменчив.

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.10.0-rc.1/dist/katex.min.css" integrity="sha384-D+9gmBxUQogRLqvARvNLmA9hS2x//eK1FhVb9PiU86gmcrBrJAQT8okdJ4LMp2uv" crossorigin="anonymous">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.10.0-rc.1/dist/katex.min.js" integrity="sha384-483A6DwYfKeDa0Q52fJmxFXkcPCFfnXMoXblOkJ4JcA8zATN6Tm78UNL72AKk+0O" crossorigin="anonymous"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.10.0-rc.1/dist/contrib/auto-render.min.js" integrity="sha384-yACMu8JWxKzSp/C1YV86pzGiQ/l1YUfE8oPuahJQxzehAjEt2GiQuy/BIvl9KyeF" crossorigin="anonymous"></script>
<script>
  window.onload = () => {
    renderMathInElement(document.body, {
      delimiters: [
        {left: "$$", right: "$$", display: true},
        {left: "$", right: "$", display: false}
      ],
      macros: {
        "\\\n": "\\\\",
      }
    });
  };
</script>
