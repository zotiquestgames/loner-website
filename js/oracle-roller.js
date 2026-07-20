(function () {
  var LABELS = {
    'yes': 'Yes', 'yes-but': 'Yes, but…', 'yes-and': 'Yes, and…',
    'no': 'No', 'no-but': 'No, but…', 'no-and': 'No, and…'
  };

  function rollResult() {
    var chance = 1 + Math.floor(Math.random() * 6);
    var risk = 1 + Math.floor(Math.random() * 6);
    var result, twist = false;
    if (chance === risk) {
      result = 'yes-but';
      twist = true;
    } else if (chance > risk) {
      result = (chance >= 4 && risk >= 4) ? 'yes-and' : (chance <= 3 && risk <= 3) ? 'yes-but' : 'yes';
    } else {
      result = (chance >= 4 && risk >= 4) ? 'no-and' : (chance <= 3 && risk <= 3) ? 'no-but' : 'no';
    }
    return { chance: chance, risk: risk, result: result, twist: twist };
  }

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('oracleRollButton');
    var output = document.getElementById('oracleRollResult');
    if (!button || !output) return;

    var chanceGlyph = output.querySelector('[data-role="chance"]');
    var riskGlyph = output.querySelector('[data-role="risk"]');
    var resultLabel = output.querySelector('[data-role="result"]');
    var twistChip = output.querySelector('[data-role="twist"]');

    button.addEventListener('click', function () {
      var roll = rollResult();
      chanceGlyph.textContent = String(roll.chance);
      riskGlyph.textContent = String(roll.risk);
      resultLabel.textContent = LABELS[roll.result] || roll.result;
      resultLabel.classList.toggle('oracle-badge__result--no', roll.result.indexOf('no') === 0);
      twistChip.style.display = roll.twist ? 'inline-block' : 'none';
      output.classList.add('is-visible');
    });
  });
})();
