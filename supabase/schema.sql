-- GymDigi (Playbook x Instagram) Supabase PostgreSQL Şeması ve RLS Kuralları

-- 1. Profiller (Kullanıcılar, Antrenörler, Admin)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  full_name text not null,
  role text not null default 'user' check (role in ('user', 'creator', 'admin')),
  avatar_url text,
  bio text,
  specialty text[],
  monthly_price_try integer default 299,
  quarterly_price_try integer default 749,
  iban_info text,
  instagram_handle text,
  is_verified boolean default false,
  created_at timestamptz default now()
);

-- 2. Programlar (Playbook tarzı çok haftalı antrenman programları)
create table public.programs (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid references public.profiles(id) on delete cascade not null,
  slug text unique not null,
  title text not null,
  subtitle text,
  description text,
  cover_image text,
  duration_weeks integer not null default 6,
  workouts_per_week integer not null default 4,
  level text not null default 'Orta' check (level in ('Başlangıç', 'Orta', 'İleri', 'Tüm Seviyeler')),
  equipment text not null default 'Full Gym',
  is_published boolean default true,
  created_at timestamptz default now()
);

-- 3. Antrenmanlar (Program içindeki veya tekil günlük antrenmanlar)
create table public.workouts (
  id uuid primary key default gen_random_uuid(),
  program_id uuid references public.programs(id) on delete cascade,
  creator_id uuid references public.profiles(id) on delete cascade not null,
  week_number integer default 1,
  day_number integer default 1,
  title text not null,
  focus_area text,
  duration_minutes integer not null default 45,
  is_free_preview boolean default false,
  created_at timestamptz default now()
);

-- 4. Antrenman Egzersizleri (Video, set, tekrar, dinlenme süresi)
create table public.workout_exercises (
  id uuid primary key default gen_random_uuid(),
  workout_id uuid references public.workouts(id) on delete cascade not null,
  order_index integer not null default 1,
  name text not null,
  video_url text not null, -- YouTube unlisted embed veya Bunny Stream HLS
  sets integer not null default 4,
  reps text not null default '10-12',
  rest_seconds integer not null default 60,
  coach_notes text,
  superset_label text -- Örn: 'A1', 'A2', 'B1'
);

-- 5. Reels / Kısa Ücretsiz Önizleme Videoları (Instagram Keşfet & Profil 9:16 Grid)
create table public.reels (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  caption text,
  thumbnail_url text,
  video_url text not null,
  views_count integer default 0,
  likes_count integer default 0,
  created_at timestamptz default now()
);

-- 6. Abonelikler (Yaratıcı başına abonelik + Manuel / iyzico ödeme takibi)
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  creator_id uuid references public.profiles(id) on delete cascade not null,
  plan_type text not null default 'monthly' check (plan_type in ('monthly', 'quarterly')),
  amount_try integer not null,
  platform_fee_try integer not null, -- Örn: %10 komisyon
  payment_method text not null default 'manual_iban' check (payment_method in ('manual_iban', 'iyzico')),
  payment_reference text, -- Dekont açıklaması veya iyzico işlem no
  status text not null default 'pending' check (status in ('pending', 'active', 'expired', 'cancelled')),
  starts_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz default now()
);

-- 7. Antrenman Tamamlama & Set Logları
create table public.workout_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  workout_id uuid references public.workouts(id) on delete cascade not null,
  completed_sets jsonb not null default '[]'::jsonb,
  duration_seconds integer,
  completed_at timestamptz default now()
);

-- Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.programs enable row level security;
alter table public.workouts enable row level security;
alter table public.workout_exercises enable row level security;
alter table public.reels enable row level security;
alter table public.subscriptions enable row level security;
alter table public.workout_logs enable row level security;

-- Herkes profilleri, yayınlanmış programları ve reels videolarını görebilir
create policy "Herkes profilleri görebilir" on public.profiles for select using (true);
create policy "Herkes yayınlanmış programları görebilir" on public.programs for select using (is_published = true);
create policy "Herkes antrenman başlıklarını görebilir" on public.workouts for select using (true);
create policy "Herkes reels videolarını görebilir" on public.reels for select using (true);

-- Egzersiz detayları ve videoları: Sadece ücretsiz önizleme VEYA aktif aboneliği olanlar görebilir
create policy "Abone veya ücretsiz önizleme egzersiz erişimi" on public.workout_exercises
  for select using (
    exists (
      select 1 from public.workouts w
      where w.id = workout_exercises.workout_id
      and (
        w.is_free_preview = true
        or w.creator_id = auth.uid()
        or exists (
          select 1 from public.subscriptions s
          where s.user_id = auth.uid()
          and s.creator_id = w.creator_id
          and s.status = 'active'
          and s.expires_at > now()
        )
      )
    )
  );
