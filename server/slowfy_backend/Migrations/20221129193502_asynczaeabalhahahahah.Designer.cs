﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using slowfy_backend.Data;

#nullable disable

namespace slowfybackend.Migrations
{
    [DbContext(typeof(slowfy_backendContext))]
    [Migration("20221129193502_asynczaeabalhahahahah")]
    partial class asynczaeabalhahahahah
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("slowfy_backend.Models.Auditions", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("ListenerId")
                        .HasColumnType("integer");

                    b.Property<int>("TrackId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ListenerId");

                    b.HasIndex("TrackId");

                    b.ToTable("Auditions");
                });

            modelBuilder.Entity("slowfy_backend.Models.FavouriteTracks", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("AddingUserId")
                        .HasColumnType("integer");

                    b.Property<int>("TargetTrackId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("AddingUserId");

                    b.HasIndex("TargetTrackId");

                    b.ToTable("FavouriteTracks");
                });

            modelBuilder.Entity("slowfy_backend.Models.Tracks", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Author")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Duration")
                        .HasColumnType("integer");

                    b.Property<string>("Source")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Tracks");
                });

            modelBuilder.Entity("slowfy_backend.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("AvatarSrc")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(64)
                        .HasColumnType("character varying(64)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(32)
                        .HasColumnType("character varying(32)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("slowfy_backend.Models.Auditions", b =>
                {
                    b.HasOne("slowfy_backend.Models.User", "Listener")
                        .WithMany()
                        .HasForeignKey("ListenerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("slowfy_backend.Models.Tracks", "Track")
                        .WithMany()
                        .HasForeignKey("TrackId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Listener");

                    b.Navigation("Track");
                });

            modelBuilder.Entity("slowfy_backend.Models.FavouriteTracks", b =>
                {
                    b.HasOne("slowfy_backend.Models.User", "AddingUser")
                        .WithMany()
                        .HasForeignKey("AddingUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("slowfy_backend.Models.Tracks", "TargetTrack")
                        .WithMany()
                        .HasForeignKey("TargetTrackId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AddingUser");

                    b.Navigation("TargetTrack");
                });
#pragma warning restore 612, 618
        }
    }
}
