using Microsoft.EntityFrameworkCore;
using MovieLibrary.Model;
using System.Linq;

namespace MovieLibrary.Service
{
    public partial class MovieLibraryContext : DbContext
    {
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Movie> Movie { get; set; }
        public DbSet<MovieGenre> MovieGenre { get; set; }
        public DbSet<FileData> FileData { get; set; }
        public DbSet<FileInfo> FileInfo { get; set; }
        public DbSet<ImageType> ImageType { get; set; }
        public DbSet<MovieImage> MovieImage { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=(LocalDb)\\MSSQLLocalDB;Database=MovieLibrary;Integrated Security=True;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FileData>()
                .HasKey(bc => new { bc.FileDataId });

            modelBuilder.Entity<FileData>()
                .HasOne(bc => bc.FileInfo)
                .WithOne(bc => bc.FileData)
                .HasForeignKey<FileInfo>(bc => bc.FileDataId);
           
            modelBuilder.Entity<FileInfo>()
            .HasKey(bc => new { bc.FileInfoId });

            modelBuilder.Entity<ImageType>()
                .HasKey(bc => new { bc.ImageTypeId });

            modelBuilder.Entity<MovieImage>()
                .HasKey(bc => new { bc.MovieId, bc.ImageTypeId, bc.FileInfoId });

            modelBuilder.Entity<MovieImage>()
                .HasOne(bc => bc.Movie)
                .WithMany(bc => bc.MovieImages)
                .HasForeignKey(bc => bc.MovieId);
            modelBuilder.Entity<MovieImage>()
                 .HasOne(bc => bc.FileInfo)
                 .WithMany(bc => bc.MovieImages)
                 .HasForeignKey(bc => bc.FileInfoId);
            modelBuilder.Entity<MovieImage>()
                .HasOne(bc => bc.ImageType)
                .WithMany(bc => bc.MovieImages)
                .HasForeignKey(bc => bc.ImageTypeId);
            modelBuilder.Entity<MovieImage>()
                .HasOne(bc => bc.ImageType)
                .WithMany(bc => bc.MovieImages)
                .HasForeignKey(bc => bc.ImageTypeId);

            modelBuilder.Entity<MovieGenre>()
                .HasKey(bc => new { bc.MovieId, bc.GenreId });
            modelBuilder.Entity<MovieGenre>()
                .HasOne(bc => bc.Movie)
                .WithMany(b => b.MovieGenres)
                .HasForeignKey(bc => bc.MovieId);
            modelBuilder.Entity<MovieGenre>()
                .HasOne(bc => bc.Genre)
                .WithMany(c => c.MovieGenres)
                .HasForeignKey(bc => bc.GenreId);

            modelBuilder.Entity<Genre>(entity =>
            {
                entity.Property(e => e.GenreName)
                 .HasMaxLength(50)
                 .IsUnicode(false);
            });

            modelBuilder.Entity<Movie>(entity =>
            {
                entity.Property(e => e.Language)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.MovieName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}