# Glossary — <project>

The words this project uses in a sense of its own, defined once. A reader of any
document here — and any reviewer, human or machine — settles a word's meaning
from this table, not from their own vocabulary.

A word belongs here when it carries a meaning the dictionary does not give it:
the project's own things, states, events and rules. General words stay out.
Define a word here **before** it is used in `docs/REQUIREMENTS.md`,
`docs/DESIGN.md` or `.backlog/DECISIONS.md`; the pre-commit check names a
backticked term that those documents use and this table does not carry.

Columns:

- **語** — the word as written, in the documents' own language. The pre-commit
  check reads a term only when it carries no ASCII, so an English glossary is
  read by a person and by `ja-review`, but not by that check.
- **意味** — one sentence. What it is, not what it is like.
- **種別** — もの（a thing that has identity）／ 値（a value, equal when its
  contents are equal）／ 出来事（something that happened, recorded）／
  規則（something that must hold）／ 場所（where something lives）.
- **出どころ** — 家（coined here）／ 直訳（carried over from another language）／
  標準（an established term of the field, used as the field uses it）.
  Say which, so a coined word can be re-judged later.
- **候補** — a more natural word, when the current one reads as a translation or
  as jargon. Leave it empty when the word is right. Changing a word is a
  separate decision; this column only carries the option.
- **出所** — where the meaning is fixed: a decision (D-number), a table, a
  source document. A word with no source is a word nobody has ruled on.
- **在り処** — where the thing itself lives: the file, table or directory a
  reader opens to see it.

| 語 | 意味 | 種別 | 出どころ | 候補 | 出所 | 在り処 |
|---|---|---|---|---|---|---|
