import css from "./LayoutNotes.module.css"

type Props = {
  readonly children: React.ReactNode;
  readonly sidebar: React.ReactNode;
};

function LayoutNotes({ children, sidebar }: Props) {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}

export default LayoutNotes;
