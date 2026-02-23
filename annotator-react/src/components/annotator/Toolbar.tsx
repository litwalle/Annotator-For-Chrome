import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Undo2, Redo2, Eraser, Trash2, Copy, Send, GripVertical } from 'lucide-react'
import { IconBtn, Sep } from './IconBtn'
import { CloseBtn } from './CloseBtn'
import { StatusButton } from './StatusButton'
import { ColorPicker } from './ColorPicker'
import { TOOLS } from '../../constants'
import { colors, radii, shadows, zIndex } from '../../designTokens'
import type { ToolId, SendStatus } from '../../types'

const COPY_CONFIG = {
    labels: { idle: 'Copy', sending: 'Copying…', success: 'Copied', error: 'Error' } as Record<SendStatus, string>,
    tooltipLabel: 'Copy to clipboard',
    width: 100,
    IdleIcon: Copy,
}

const SEND_CONFIG = {
    labels: { idle: 'Add to Antigravity', sending: 'Sending…', success: 'Added', error: 'Error' } as Record<SendStatus, string>,
    tooltipLabel: 'Send to Antigravity',
    width: 164,
    IdleIcon: Send,
}

export function Toolbar({ tool, isCropActive, activeColor, copyStatus, sendStatus, hasSelection, canRedo, show, isClosing, onChangeTool, onSetActiveColor, onUndo, onRedo, onClearAll, onDelete, onCopy, onSend, onClose }: {
    tool: ToolId
    isCropActive: boolean
    activeColor: string
    copyStatus: SendStatus
    sendStatus: SendStatus
    hasSelection: boolean
    canRedo: boolean
    show: boolean
    isClosing: boolean
    onChangeTool: (t: ToolId) => void
    onSetActiveColor: (c: string) => void
    onUndo: () => void
    onRedo: () => void
    onClearAll: () => void
    onDelete: () => void
    onCopy: () => void
    onSend: () => void
    onClose: () => void
}) {
    const enterT = 'opacity 0.28s cubic-bezier(0,0,0.2,1), transform 0.34s cubic-bezier(0,0,0.2,1)'
    const exitT = 'opacity 0.22s cubic-bezier(0.4,0,1,1), transform 0.22s cubic-bezier(0.4,0,1,1)'

    // ── 拖拽定位 ──
    const [pos, setPos] = useState<{ x: number; y: number } | null>(null) // null = 默认底部居中
    const dragRef = useRef<{ startMouseX: number; startMouseY: number; startX: number; startY: number } | null>(null)
    const toolbarRef = useRef<HTMLDivElement>(null)
    const [dragHov, setDragHov] = useState(false)

    const handleDragStart = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        const el = toolbarRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        dragRef.current = {
            startMouseX: e.clientX,
            startMouseY: e.clientY,
            startX: rect.left,
            startY: rect.top,
        }
    }, [])

    useEffect(() => {
        function onMouseMove(e: MouseEvent) {
            if (!dragRef.current) return
            const dx = e.clientX - dragRef.current.startMouseX
            const dy = e.clientY - dragRef.current.startMouseY
            const el = toolbarRef.current
            if (!el) return
            const w = el.offsetWidth
            const h = el.offsetHeight
            // 限制在视口内
            const nx = Math.max(0, Math.min(window.innerWidth - w, dragRef.current.startX + dx))
            const ny = Math.max(0, Math.min(window.innerHeight - h, dragRef.current.startY + dy))
            setPos({ x: nx, y: ny })
        }
        function onMouseUp() {
            dragRef.current = null
        }
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)
        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
        }
    }, [])

    // 双击拖拽手柄恢复默认位置
    const handleDoubleClick = useCallback(() => {
        setPos(null)
    }, [])

    // 位置样式：默认底部居中 vs 自定义位置
    const posStyle: React.CSSProperties = pos
        ? { left: pos.x, top: pos.y, transform: `translateY(${show ? 0 : 28}px)` }
        : { bottom: 28, left: '50%', transform: `translateX(-50%) translateY(${show ? 0 : 28}px)` }

    return (
        <div ref={toolbarRef} style={{
            position: 'fixed',
            ...posStyle,
            display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px',
            borderRadius: radii.lg, background: colors.bgSolid,
            boxShadow: shadows.toolbar,
            border: `1px solid ${colors.white15}`, userSelect: 'none',
            opacity: show ? 1 : 0,
            zIndex: zIndex.toolbar,
            transition: isClosing ? exitT : enterT,
        }}>
            {/* 拖拽手柄 */}
            <div
                onMouseDown={handleDragStart}
                onDoubleClick={handleDoubleClick}
                onMouseOver={() => setDragHov(true)}
                onMouseOut={() => setDragHov(false)}
                style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 16, height: 32, cursor: 'grab',
                    borderRadius: radii.xs, marginRight: 2,
                    background: dragHov ? colors.white10 : 'transparent',
                    transition: 'background 0.15s',
                }}
            >
                <GripVertical size={14} strokeWidth={1.4} color={colors.textGhost} />
            </div>

            {TOOLS.map(({ id, label, shortcut, Icon }) => (
                <IconBtn
                    key={id}
                    active={id === 'crop' ? isCropActive : tool === id}
                    onClick={() => onChangeTool(id)}
                    Icon={Icon}
                    label={label}
                    shortcut={shortcut}
                />
            ))}

            <ColorPicker activeColor={activeColor} onChange={onSetActiveColor} />

            <Sep />
            <IconBtn Icon={Undo2} active={false} onClick={onUndo} label="Undo" shortcut="⌘Z" />
            <IconBtn Icon={Redo2} active={false} onClick={onRedo} disabled={!canRedo} label="Redo" shortcut="⌘⇧Z" />
            <IconBtn Icon={Trash2} active={false} onClick={onDelete} disabled={!hasSelection} label="Delete" shortcut="⌫" />
            <IconBtn Icon={Eraser} active={false} onClick={onClearAll} danger label="Clear all" />
            <Sep />
            <StatusButton status={copyStatus} onClick={onCopy} config={COPY_CONFIG} />
            <StatusButton status={sendStatus} onClick={onSend} config={SEND_CONFIG} />
            <CloseBtn onClick={onClose} />
        </div>
    )
}
