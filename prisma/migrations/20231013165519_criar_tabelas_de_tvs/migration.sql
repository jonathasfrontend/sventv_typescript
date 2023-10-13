-- CreateTable
CREATE TABLE "filmes" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "filmes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "esports" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "esports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variedades" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "variedades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "desenhos" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "desenhos_pkey" PRIMARY KEY ("id")
);
