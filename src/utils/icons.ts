import {
  GraduationCap, Globe, Network, Search, ShieldCheck, Terminal, Flag,
  Wrench, ClipboardList, Radio, Award, Compass, Folder, Shuffle, Send,
  Loader2, Star, Lock, Download, Check, X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  'graduation-cap': GraduationCap,
  'globe': Globe,
  'network': Network,
  'search': Search,
  'shield-check': ShieldCheck,
  'terminal': Terminal,
  'flag': Flag,
  'wrench': Wrench,
  'clipboard-list': ClipboardList,
  'radio': Radio,
  'award': Award,
  'compass': Compass,
  'folder': Folder,
  'shuffle': Shuffle,
  'send': Send,
  'loader': Loader2,
  'star': Star,
  'lock': Lock,
  'download': Download,
  'check': Check,
  'x': X,
}

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Folder
}
