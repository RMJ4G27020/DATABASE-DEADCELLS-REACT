import { useCallback, useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type TierRank = 'S' | 'A' | 'B' | 'C' | 'D'

type Game = {
  id: number
  name: string
  description?: string | null
}

type Item = {
  id: number
  name: string
  description?: string | null
  imageUrl?: string | null
}

type TierList = {
  id: number
  title: string
  description?: string | null
  isPublic: boolean
  userId: number
  gameId: number
}

type TierListItem = {
  id: number
  rank: TierRank
  position: number
  itemId: number
  item?: Item
}

const RANK_ORDER: TierRank[] = ['S', 'A', 'B', 'C', 'D']
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

type FeedbackState = {
  type: 'success' | 'error'
  message: string
}

function App() {
  const [games, setGames] = useState<Game[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [tierLists, setTierLists] = useState<TierList[]>([])
  const [selectedTierList, setSelectedTierList] = useState<TierList | null>(null)
  const [tierListItems, setTierListItems] = useState<TierListItem[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<FeedbackState | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState<'games' | 'items' | 'tierlists'>('tierlists')

  // Forms
  const [gameForm, setGameForm] = useState({ name: '', description: '' })
  const [itemForm, setItemForm] = useState({ name: '', description: '', imageUrl: '' })
  const [tierListForm, setTierListForm] = useState({ title: '', description: '', gameId: '', userId: '1' })
  const [addItemForm, setAddItemForm] = useState({ itemId: '', rank: 'S' as TierRank })

  const loadGames = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/games`)
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)
      const data: Game[] = await response.json()
      setGames(data)
    } catch (err) {
      console.error('Error loading games:', err)
    }
  }, [])

  const loadItems = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/items`)
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)
      const data: Item[] = await response.json()
      setItems(data)
    } catch (err) {
      console.error('Error loading items:', err)
    }
  }, [])

  const loadTierLists = useCallback(async () => {
    setStatus('loading')
    setError(null)
    try {
      const response = await fetch(`${API_BASE_URL}/tierlists`)
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)
      const data: TierList[] = await response.json()
      setTierLists(data)
      setStatus('success')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido'
      setError(message)
      setStatus('error')
    }
  }, [])

  const loadTierListItems = useCallback(async (tierListId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tierlists/${tierListId}/items`)
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)
      const data: TierListItem[] = await response.json()
      setTierListItems(data)
    } catch (err) {
      console.error('Error loading tier list items:', err)
    }
  }, [])

  useEffect(() => {
    void loadGames()
    void loadItems()
    void loadTierLists()
  }, [loadGames, loadItems, loadTierLists])

  const resetFeedbackLater = useCallback(() => {
    window.setTimeout(() => setFeedback(null), 3500)
  }, [])

  const handleCreateGame = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setFeedback(null)

    try {
      const response = await fetch(`${API_BASE_URL}/games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameForm),
      })

      if (!response.ok) throw new Error(response.statusText)

      setGameForm({ name: '', description: '' })
      setFeedback({ type: 'success', message: 'Juego creado correctamente.' })
      resetFeedbackLater()
      await loadGames()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear el juego.'
      setFeedback({ type: 'error', message })
      resetFeedbackLater()
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCreateItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setFeedback(null)

    try {
      const response = await fetch(`${API_BASE_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemForm),
      })

      if (!response.ok) throw new Error(response.statusText)

      setItemForm({ name: '', description: '', imageUrl: '' })
      setFeedback({ type: 'success', message: 'Item creado correctamente.' })
      resetFeedbackLater()
      await loadItems()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear el item.'
      setFeedback({ type: 'error', message })
      resetFeedbackLater()
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCreateTierList = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setFeedback(null)

    try {
      const response = await fetch(`${API_BASE_URL}/tierlists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...tierListForm,
          gameId: parseInt(tierListForm.gameId),
          userId: parseInt(tierListForm.userId),
        }),
      })

      if (!response.ok) throw new Error(response.statusText)

      setTierListForm({ title: '', description: '', gameId: '', userId: '1' })
      setFeedback({ type: 'success', message: 'Tier list creada correctamente.' })
      resetFeedbackLater()
      await loadTierLists()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear la tier list.'
      setFeedback({ type: 'error', message })
      resetFeedbackLater()
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddItemToTierList = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selectedTierList) return
    setIsSubmitting(true)
    setFeedback(null)

    try {
      const response = await fetch(`${API_BASE_URL}/tierlists/${selectedTierList.id}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId: parseInt(addItemForm.itemId),
          rank: addItemForm.rank,
          position: tierListItems.filter(item => item.rank === addItemForm.rank).length + 1,
        }),
      })

      if (!response.ok) throw new Error(response.statusText)

      setAddItemForm({ itemId: '', rank: 'S' })
      setFeedback({ type: 'success', message: 'Item agregado a la tier list correctamente.' })
      resetFeedbackLater()
      await loadTierListItems(selectedTierList.id)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al agregar el item.'
      setFeedback({ type: 'error', message })
      resetFeedbackLater()
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectTierList = (tierList: TierList) => {
    setSelectedTierList(tierList)
    void loadTierListItems(tierList.id)
  }

  const groupedTierListItems = useMemo(
    () =>
      RANK_ORDER.map((rank) => ({
        rank,
        items: tierListItems.filter((item) => item.rank === rank),
      })),
    [tierListItems],
  )

  return (
    <div className="app">
      <header className="app__header">
        <h1>Game Tier List Manager</h1>
        <p>Gestiona tier lists para tus juegos favoritos.</p>
      </header>

      <nav className="tabs">
        <button
          className={`tab ${activeTab === 'games' ? 'tab--active' : ''}`}
          onClick={() => setActiveTab('games')}
        >
          Juegos
        </button>
        <button
          className={`tab ${activeTab === 'items' ? 'tab--active' : ''}`}
          onClick={() => setActiveTab('items')}
        >
          Items
        </button>
        <button
          className={`tab ${activeTab === 'tierlists' ? 'tab--active' : ''}`}
          onClick={() => setActiveTab('tierlists')}
        >
          Tier Lists
        </button>
      </nav>

      {feedback && (
        <p className={`feedback feedback--${feedback.type}`}>{feedback.message}</p>
      )}

      {activeTab === 'games' && (
        <div>
          <section className="panel">
            <h2 className="panel__title">Agregar nuevo juego</h2>
            <form className="form" onSubmit={handleCreateGame}>
              <label className="form-field">
                <span>Nombre</span>
                <input
                  type="text"
                  value={gameForm.name}
                  onChange={(e) => setGameForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </label>
              <label className="form-field">
                <span>Descripción</span>
                <textarea
                  value={gameForm.description}
                  onChange={(e) => setGameForm(prev => ({ ...prev, description: e.target.value }))}
                />
              </label>
              <button className="btn btn--primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creando…' : 'Crear juego'}
              </button>
            </form>
          </section>

          <section className="panel">
            <h2 className="panel__title">Juegos disponibles</h2>
            <ul className="list">
              {games.map(game => (
                <li key={game.id} className="list-item">
                  <h3>{game.name}</h3>
                  {game.description && <p>{game.description}</p>}
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {activeTab === 'items' && (
        <div>
          <section className="panel">
            <h2 className="panel__title">Agregar nuevo item</h2>
            <form className="form" onSubmit={handleCreateItem}>
              <label className="form-field">
                <span>Nombre</span>
                <input
                  type="text"
                  value={itemForm.name}
                  onChange={(e) => setItemForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </label>
              <label className="form-field">
                <span>Descripción</span>
                <textarea
                  value={itemForm.description}
                  onChange={(e) => setItemForm(prev => ({ ...prev, description: e.target.value }))}
                />
              </label>
              <label className="form-field">
                <span>URL de imagen</span>
                <input
                  type="url"
                  value={itemForm.imageUrl}
                  onChange={(e) => setItemForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                />
              </label>
              <button className="btn btn--primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creando…' : 'Crear item'}
              </button>
            </form>
          </section>

          <section className="panel">
            <h2 className="panel__title">Items disponibles</h2>
            <ul className="list">
              {items.map(item => (
                <li key={item.id} className="list-item">
                  <h3>{item.name}</h3>
                  {item.description && <p>{item.description}</p>}
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {activeTab === 'tierlists' && (
        <div>
          <section className="panel">
            <h2 className="panel__title">Crear nueva tier list</h2>
            <form className="form" onSubmit={handleCreateTierList}>
              <label className="form-field">
                <span>Título</span>
                <input
                  type="text"
                  value={tierListForm.title}
                  onChange={(e) => setTierListForm(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </label>
              <label className="form-field">
                <span>Descripción</span>
                <textarea
                  value={tierListForm.description}
                  onChange={(e) => setTierListForm(prev => ({ ...prev, description: e.target.value }))}
                />
              </label>
              <label className="form-field">
                <span>Juego</span>
                <select
                  value={tierListForm.gameId}
                  onChange={(e) => setTierListForm(prev => ({ ...prev, gameId: e.target.value }))}
                  required
                >
                  <option value="">Seleccionar juego</option>
                  {games.map(game => (
                    <option key={game.id} value={game.id}>{game.name}</option>
                  ))}
                </select>
              </label>
              <button className="btn btn--primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creando…' : 'Crear tier list'}
              </button>
            </form>
          </section>

          <section className="panel">
            <h2 className="panel__title">Tier Lists disponibles</h2>
            <ul className="list">
              {tierLists.map(tierList => (
                <li key={tierList.id} className="list-item">
                  <h3>{tierList.title}</h3>
                  {tierList.description && <p>{tierList.description}</p>}
                  <button
                    className="btn btn--secondary"
                    onClick={() => selectTierList(tierList)}
                  >
                    Ver tier list
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {selectedTierList && (
            <section className="panel">
              <h2 className="panel__title">{selectedTierList.title}</h2>
              <section className="panel">
                <h3>Agregar item a esta tier list</h3>
                <form className="form" onSubmit={handleAddItemToTierList}>
                  <label className="form-field">
                    <span>Seleccionar item</span>
                    <select
                      value={addItemForm.itemId}
                      onChange={(e) => setAddItemForm(prev => ({ ...prev, itemId: e.target.value }))}
                      required
                    >
                      <option value="">Seleccionar item</option>
                      {items.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))}
                    </select>
                  </label>
                  <label className="form-field">
                    <span>Rank</span>
                    <select
                      value={addItemForm.rank}
                      onChange={(e) => setAddItemForm(prev => ({ ...prev, rank: e.target.value as TierRank }))}
                      required
                    >
                      {RANK_ORDER.map(rank => (
                        <option key={rank} value={rank}>{rank}</option>
                      ))}
                    </select>
                  </label>
                  <button className="btn btn--primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Agregando…' : 'Agregar item'}
                  </button>
                </form>
              </section>
              {status === 'loading' && <p className="status status--loading">Cargando...</p>}
              {status === 'error' && error && (
                <p className="status status--error">Error: {error}</p>
              )}
              {status === 'success' && (
                <div className="tier-grid">
                  {groupedTierListItems.map(({ rank, items: rankItems }) => (
                    <article key={rank} className="tier-column">
                      <div className={`tier-header rank-${rank}`}>{rank}</div>
                      <ul className="tier-items">
                        {rankItems.length === 0 ? (
                          <li className="tier-item tier-item--empty">Sin elementos en esta categoría.</li>
                        ) : (
                          rankItems.map((tierListItem) => (
                            <li key={tierListItem.id} className="tier-item">
                              <div>
                                <h3 className="tier-item__name">{tierListItem.item?.name}</h3>
                                {tierListItem.item?.description && (
                                  <p className="tier-item__description">{tierListItem.item.description}</p>
                                )}
                              </div>
                            </li>
                          ))
                        )}
                      </ul>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      )}
    </div>
  )
}

export default App
