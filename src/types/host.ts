/** A co-host listed beside the main host. Photo when available, tinted initial otherwise. */
export interface CoHost {
  id: string;
  name: string;
  avatarSrc?: string;
  initial?: string;
  avatarBackground?: string;
  avatarColor?: string;
}

export interface Host {
  name: string;
  avatarSrc?: string;
  reviewCount: number;
  rating: number;
  yearsHosting: number;
  bornDecade: string;
  school: string;
  responseRatePercent: number;
  responseTime: string;
  coHosts?: readonly CoHost[];
}
