import React, { useEffect } from 'react'
import "./thememenu.css"

const mode_settings = [
    {
        id: 'light',
        name: 'Light',
        background: 'light-background',
        class: 'theme-mode-light'
    },
    {
        id: 'dark',
        name: 'Dark',
        background: 'dark-background',
        class: 'theme-mode-dark'
    }
]

const color_settings = [
    {
        id: 'blue',
        name: 'Blue',
        background: 'blue-color',
        class: 'theme-color-blue'
    },
    {
        id: 'red',
        name: 'Red',
        background: 'red-color',
        class: 'theme-color-red'
    },
    {
        id: 'cyan',
        name: 'Cyan',
        background: 'cyan-color',
        class: 'theme-color-cyan'
    },
    {
        id: 'green',
        name: 'Green',
        background: 'green-color',
        class: 'theme-color-green'
    },
    {
        id: 'orange',
        name: 'Orange',
        background: 'orange-color',
        class: 'theme-color-orange'
    },
]

const clickOutsideRef = (content_ref, toggle_ref) => {
    document.addEventListener('mousedown', (e) => {
      // click toggle
      if(toggle_ref.current && toggle_ref.current.contains(e.target)) {
        content_ref.current.classList.toggle('active')
      }
      else {
        // use click outside toggle and content
        if(content_ref.current && !content_ref.current.contains(e.target)) {
          content_ref.current.classList.remove('active')
        }
      }
    })
  }

const Thememenu = () => {
    const menu_ref = React.useRef(null)
    const menu_toggle_ref = React.useRef(null)

    clickOutsideRef(menu_ref, menu_toggle_ref)

    const setActiveMenu = () => menu_ref.current.classList.add('active')

    const closeMenu = () => menu_ref.current.classList.remove('active')

    const [currMode, setCurrMode] = React.useState('light')
    const [currColor, setCurrColor] = React.useState('blue')

    const setMode = (mode) => {
        setCurrMode(mode.id)
        localStorage.setItem('themeMode', mode.class)
    }

    const setColor = (color) => {
        setCurrColor(color.id)
        localStorage.setItem('themeColor', color.class)
    }

    useEffect(() => {
        const themeClass = mode_settings.find(e => e.class === localStorage.getItem('themeMode', 'theme-mode-light'))
        const colorClass = mode_settings.find(e => e.class === localStorage.getItem('themeColor', 'theme-mode-light'))
       if(themeClass !== undefined) setCurrMode(themeClass.id)
       if(colorClass !== undefined) setCurrColor(colorClass.id)
    }, [])

  return (
    <div>
        <button ref={menu_toggle_ref} className='dropdow-toggle' onClick={() => setActiveMenu()}>
            <i className='bx bx-palette'></i>
        </button>
        <div ref={menu_ref} className='theme-menu'>
            <h4>Theme Settings</h4>
            <button className='theme-menu_close' onClick={() => closeMenu()}>
                <i className='bx bx-x'></i>
            </button>
            <div className='theme-menu_select'>
                <span>Choose mode</span>
                <ul className='mode-list'>
                    {
                        mode_settings.map((item, index) => (
                            <li key={index} onClick={() => setMode(item)}>
                                <div className={`mode-list_color ${item.background} ${item.id === currMode ? 'active' : ''}`}>
                                    <i className='bx bx-check'></i>
                                </div>
                                <span>{item.name}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className='theme-menu_select'>
                <span>Choose color</span>
                <ul className='mode-list'>
                    {
                        color_settings.map((item, index) => (
                            <li key={index} onClick={() => setColor(item)}>
                                <div className={`mode-list_color ${item.background} ${item.id === currColor ? 'active' : ''}`}>
                                    <i className='bx bx-check'></i>
                                </div>
                                <span>{item.name}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Thememenu