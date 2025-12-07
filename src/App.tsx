import { Button } from '@/components/ui/button'

function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-16">
        <header className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Vite + Tailwind CSS + shadcn/ui
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            セットアップが完了しました
          </h1>
          <p className="text-base text-muted-foreground">
            `src/components/ui` に追加したコンポーネントをインポートして利用できます。
          </p>
        </header>
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
      </div>
    </main>
  )
}

export default App
