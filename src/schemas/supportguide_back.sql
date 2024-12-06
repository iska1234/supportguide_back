PGDMP      !            
    |            supportguide    16.3    16.3     
           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16691    supportguide    DATABASE        CREATE DATABASE supportguide WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE supportguide;
                postgres    false            �            1259    16721    companysettings    TABLE     m  CREATE TABLE public.companysettings (
    id integer NOT NULL,
    userid integer NOT NULL,
    isintrocheck boolean DEFAULT false NOT NULL,
    isdedicatoryavaliable boolean DEFAULT false NOT NULL,
    created_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 #   DROP TABLE public.companysettings;
       public         heap    postgres    false            �            1259    16720    companysettings_id_seq    SEQUENCE     �   CREATE SEQUENCE public.companysettings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.companysettings_id_seq;
       public          postgres    false    218                       0    0    companysettings_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.companysettings_id_seq OWNED BY public.companysettings.id;
          public          postgres    false    217            �            1259    16739    topics    TABLE     D  CREATE TABLE public.topics (
    id integer NOT NULL,
    title character varying(100) NOT NULL,
    description text,
    created_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    iscompleted boolean DEFAULT false
);
    DROP TABLE public.topics;
       public         heap    postgres    false            �            1259    16738    topics_id_seq    SEQUENCE     �   CREATE SEQUENCE public.topics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.topics_id_seq;
       public          postgres    false    220                       0    0    topics_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.topics_id_seq OWNED BY public.topics.id;
          public          postgres    false    219            �            1259    16693    users    TABLE     ^  CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    lastname character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(20) DEFAULT 'user'::character varying NOT NULL,
    created_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['admin'::character varying, 'user'::character varying])::text[])))
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16692    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    216                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    215            ^           2604    16724    companysettings id    DEFAULT     x   ALTER TABLE ONLY public.companysettings ALTER COLUMN id SET DEFAULT nextval('public.companysettings_id_seq'::regclass);
 A   ALTER TABLE public.companysettings ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            c           2604    16742 	   topics id    DEFAULT     f   ALTER TABLE ONLY public.topics ALTER COLUMN id SET DEFAULT nextval('public.topics_id_seq'::regclass);
 8   ALTER TABLE public.topics ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            Z           2604    16696    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216                      0    16721    companysettings 
   TABLE DATA           r   COPY public.companysettings (id, userid, isintrocheck, isdedicatoryavaliable, created_at, updated_at) FROM stdin;
    public          postgres    false    218   �!                 0    16739    topics 
   TABLE DATA           ]   COPY public.topics (id, title, description, created_at, updated_at, iscompleted) FROM stdin;
    public          postgres    false    220   �!                 0    16693    users 
   TABLE DATA           b   COPY public.users (id, name, lastname, email, password, role, created_at, updated_at) FROM stdin;
    public          postgres    false    216   �#                  0    0    companysettings_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.companysettings_id_seq', 1, true);
          public          postgres    false    217                       0    0    topics_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.topics_id_seq', 9, true);
          public          postgres    false    219                       0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 1, true);
          public          postgres    false    215            m           2606    16730 $   companysettings companysettings_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.companysettings
    ADD CONSTRAINT companysettings_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.companysettings DROP CONSTRAINT companysettings_pkey;
       public            postgres    false    218            o           2606    16732 *   companysettings companysettings_userid_key 
   CONSTRAINT     g   ALTER TABLE ONLY public.companysettings
    ADD CONSTRAINT companysettings_userid_key UNIQUE (userid);
 T   ALTER TABLE ONLY public.companysettings DROP CONSTRAINT companysettings_userid_key;
       public            postgres    false    218            q           2606    16749    topics topics_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.topics DROP CONSTRAINT topics_pkey;
       public            postgres    false    220            i           2606    16706    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    216            k           2606    16704    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            r           2606    16733 (   companysettings fk_user_company_settings    FK CONSTRAINT     �   ALTER TABLE ONLY public.companysettings
    ADD CONSTRAINT fk_user_company_settings FOREIGN KEY (userid) REFERENCES public.users(id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.companysettings DROP CONSTRAINT fk_user_company_settings;
       public          postgres    false    218    216    4715               )   x�3�4�LB##]CC]#sC+3+Klb\1z\\\ �	x           x�mS�r�@<��b>�@$K���e�D
*P�����k�4���`�(Nܸ�ǘ���:Y���-�g���`��@Vh����2+�&�R	��H����J+[��p�(}���r��).��"�/�%���,Vy9����|tֿR��Л������(A�H.��9�o����A i�]�����,�f���ݓ�5���L�c��'���N�Pwx �!�tկ�e1��Yeޡ�4���/!����,:s�z��� �l{U��#�mFQ5CT%�+sk���������n�U�FY��I�t=�X�Y�ͮ͸�%-_��鷘���Z���~�Z���wt���C8L�t�y�ω�U����l��}��;ac�k�o�0��ӽ�?;�P��d�g����9[^�g�6{m��tʊvٓ����L�j
K�䪆h}@Q�4��J����G��h��>NW]�bm�'�-��j�����'�`5XW�J͘*��6���T�"���#����?��uiB��e�e� B�         �   x�mȻ�0 й�
V
��`���Q��q��
�$�~�?�'G4h5z�[$k5X�R}�TNW։�(տ�Aݱ�7��y䗲yX6��īOr��X�S���&k(��pQ�6�\n�l�bKPm	D0	8 �8̀�b�w��(�?\.0     